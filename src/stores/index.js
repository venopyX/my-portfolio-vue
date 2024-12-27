import { defineStore } from 'pinia';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';

const COLLECTIONS = {
  PROJECTS: 'projects',
  BLOG_POSTS: 'blogPosts',
  SOCIAL_MEDIA: 'socialMedia',
  HERO: 'hero',
  PROFILE: 'profile',
  SERVICES: 'services',
  TESTIMONIALS: 'testimonials',
  HIGHLIGHTS: 'highlights'
};

export const useDataStore = defineStore('data', {
  state: () => ({
    cache: new Map(),
    lastFetch: new Map(),
    loadingStates: new Map(),
    errors: new Map(),
    subscriptions: new Map(),
    cacheDuration: 5 * 60 * 1000,
    collections: COLLECTIONS,
    isInitialized: false
  }),

  getters: {
    isLoading: (state) => (operation) => state.loadingStates.get(operation) || false,
    getError: (state) => (operation) => state.errors.get(operation) || null,
    isCacheValid: (state) => (key) => {
      const lastFetchTime = state.lastFetch.get(key);
      return lastFetchTime ? Date.now() - lastFetchTime < state.cacheDuration : false;
    },
    getCachedData: (state) => (key) => state.cache.get(key)
  },

  actions: {
    async initialize() {
      if (this.isInitialized) return;
      
      try {
        // Verify database connection with a simple query
        const testCollection = collection(db, COLLECTIONS.PROJECTS);
        const testQuery = query(testCollection);
        await getDocs(testQuery);
        this.isInitialized = true;
      } catch (error) {
        console.error('Failed to initialize Firebase connection:', error);
        throw new Error('Database initialization failed');
      }
    },

    setLoading(operation, isLoading) {
      this.loadingStates.set(operation, isLoading);
    },

    setError(operation, error) {
      const errorMessage = error?.message || error || 'Unknown error';
      console.error(`Error in operation ${operation}:`, errorMessage);
      this.errors.set(operation, errorMessage);
    },

    async fetchCollection(collectionName, options = {}) {
      const operation = `fetch_${collectionName}`;
      
      if (!this.isInitialized) {
        await this.initialize();
      }

      try {
        if (this.isCacheValid(collectionName) && this.cache.has(collectionName)) {
          return this.cache.get(collectionName);
        }

        this.setLoading(operation, true);
        this.errors.delete(operation);

        let queryRef = collection(db, collectionName);
        
        if (!queryRef) {
          throw new Error(`Invalid collection: ${collectionName}`);
        }

        if (options.filters?.length) {
          options.filters.forEach(filter => {
            if (!filter.field || !filter.operator || filter.value === undefined) {
              throw new Error('Invalid filter configuration');
            }
            queryRef = query(queryRef, where(filter.field, filter.operator, filter.value));
          });
        }

        if (options.orderBy?.field) {
          queryRef = query(queryRef, orderBy(options.orderBy.field, options.orderBy.direction || 'desc'));
        }

        const snapshot = await getDocs(queryRef);
        const data = snapshot.docs.map(doc => this.transformDocData({
          id: doc.id,
          ...doc.data()
        }));

        this.cache.set(collectionName, data);
        this.lastFetch.set(collectionName, Date.now());

        return data;
      } catch (error) {
        const errorMessage = `Failed to fetch ${collectionName}: ${error.message || 'Unknown error'}`;
        this.setError(operation, errorMessage);
        throw new Error(errorMessage);
      } finally {
        this.setLoading(operation, false);
      }
    },

    transformDocData(data) {
      if (!data || typeof data !== 'object') {
        return data;
      }

      return Object.entries(data).reduce((acc, [key, value]) => {
        if (value instanceof Timestamp) {
          acc[key] = value.toDate();
        } else if (Array.isArray(value)) {
          acc[key] = value.map(item => 
            item instanceof Timestamp ? item.toDate() : this.transformDocData(item)
          );
        } else if (value && typeof value === 'object') {
          acc[key] = this.transformDocData(value);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});
    },

    async fetchDocument(collectionName, documentId) {
      if (!collectionName || !documentId) {
        throw new Error('Collection name and document ID are required');
      }

      const operation = `fetch_${collectionName}_${documentId}`;
      const cacheKey = `${collectionName}/${documentId}`;

      if (!this.isInitialized) {
        await this.initialize();
      }

      try {
        if (this.isCacheValid(cacheKey) && this.cache.has(cacheKey)) {
          return this.cache.get(cacheKey);
        }

        this.setLoading(operation, true);
        this.errors.delete(operation);

        const docRef = doc(db, collectionName, documentId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          this.cache.set(cacheKey, null);
          this.lastFetch.set(cacheKey, Date.now());
          return null;
        }

        const data = this.transformDocData({
          id: docSnap.id,
          ...docSnap.data()
        });

        this.cache.set(cacheKey, data);
        this.lastFetch.set(cacheKey, Date.now());

        return data;
      } catch (error) {
        const errorMessage = `Failed to fetch ${collectionName}/${documentId}: ${error.message || 'Unknown error'}`;
        this.setError(operation, errorMessage);
        throw new Error(errorMessage);
      } finally {
        this.setLoading(operation, false);
      }
    },

    subscribeToCollection(collectionName, options = {}, callback) {
      if (!this.isInitialized) {
        throw new Error('Store must be initialized before subscribing');
      }

      this.unsubscribeFromCollection(collectionName);

      try {
        let queryRef = collection(db, collectionName);

        if (options.filters?.length) {
          options.filters.forEach(filter => {
            if (!filter.field || !filter.operator || filter.value === undefined) {
              throw new Error('Invalid filter configuration');
            }
            queryRef = query(queryRef, where(filter.field, filter.operator, filter.value));
          });
        }

        if (options.orderBy?.field) {
          queryRef = query(queryRef, orderBy(options.orderBy.field, options.orderBy.direction || 'desc'));
        }

        const unsubscribe = onSnapshot(queryRef,
          (snapshot) => {
            const data = snapshot.docs.map(doc => this.transformDocData({
              id: doc.id,
              ...doc.data()
            }));

            this.cache.set(collectionName, data);
            this.lastFetch.set(collectionName, Date.now());

            if (callback) callback(data);
          },
          (error) => {
            const errorMessage = `Subscription error for ${collectionName}: ${error.message || 'Unknown error'}`;
            console.error(errorMessage);
            this.setError(`subscribe_${collectionName}`, errorMessage);
          }
        );

        this.subscriptions.set(collectionName, unsubscribe);
        return unsubscribe;
      } catch (error) {
        const errorMessage = `Failed to subscribe to ${collectionName}: ${error.message || 'Unknown error'}`;
        this.setError(`subscribe_${collectionName}`, errorMessage);
        throw new Error(errorMessage);
      }
    },

    unsubscribeFromCollection(collectionName) {
      const unsubscribe = this.subscriptions.get(collectionName);
      if (typeof unsubscribe === 'function') {
        unsubscribe();
        this.subscriptions.delete(collectionName);
      }
    },

    clearCache(key) {
      if (key) {
        this.cache.delete(key);
        this.lastFetch.delete(key);
      } else {
        this.cache.clear();
        this.lastFetch.clear();
      }
    },

    unsubscribeAll() {
      this.subscriptions.forEach(unsubscribe => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      });
      this.subscriptions.clear();
    },

    setCacheDuration(duration) {
      if (typeof duration !== 'number' || duration < 0) {
        throw new Error('Cache duration must be a positive number');
      }
      this.cacheDuration = duration;
    }
  }
});