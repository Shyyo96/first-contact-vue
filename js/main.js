const API = "https://api.github.com/users/";
const requestMaxTime = 3000;

const app = Vue.createApp({
    data() {
        return {
          search: null,
          result: null, 
          error: null,
          favorites: new Map()
          
        };
    },
    created(){
        const savedFavorites = JSON.parse(window.localStorage.getItem("favorites"));
        if(savedFavorites?.length){
            savedFavorites.forEach(fav => {
                this.favorites.set(fav.login, fav);
            });
        }
    },
    methods: {
        async doSearch() {
            
            const founfavorites = this.favorites.get(this.search);
            const shouldRequestAgain = (() => {
                if(!!founfavorites){
                    const {lastRequestTime} = founfavorites;
                    const now = Date.now()
                    return (now - lastRequestTime) > requestMaxTime;
                }
                return false;
            })() //IIFE

            if(!!founfavorites && !shouldRequestAgain){
                return this.result = founfavorites;
            }
            try{
                const response = await fetch(API + this.search);
                const data = await response.json();
                this.result = data;
                console.log(this.result);
                if(!response.ok) throw new Error("User not found");
                if(founfavorites){
                    founfavorites.lastRequestTime = Date.now()
                }
            }catch(error){
                this.error = error;
            }finally{
                this.search = null;
            }
        },
        checkFavorite(login){
            return this.result?.login === login;
        },
        addFavorite(){
            this.result.lastRequestTime = Date.now();
            this.favorites.set(this.result.login, this.result);
            this.updateStorage();        
        },

        removeFavorite(){
            this.favorites.delete(this.result.login);
            this.updateStorage();        
        },

        updateStorage(){
            window.localStorage.setItem('favorites', JSON.stringify(this.allfavorites));
        },
        
        putFavOnResult(fav){
            this.result = fav;
        }        
        
    },
    computed:{
        hasOnFavorites(){
            return this.favorites.has(this.result.login);
        },

        allfavorites(){
            return Array.from(this.favorites.values())
        },
    }
    });
