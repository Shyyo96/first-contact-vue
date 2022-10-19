app.component('app-profile', {
    props: ['result', 'hasOnFavorites'],
    methods: {
        addFavorite() {
            this.$emit('add-favorite')
        },
        removeFavorite() {
            this.$emit('remove-favorite')
        }
    },
    template: 
    /* html */ `
    <div class="result">
        <!--se puede utilizar v-on o @-->
        <a v-if="hasOnFavorites" href="#" class="result__toggle-favorite" @click="removeFavorite">Remove Favorite
        ⭐️</a>
    <a v-else href="#" class="result__toggle-favorite" @click="addFavorite">Add Favorite ⭐️</a>
        <h2 class="result__name"> {{result.login}} </h2>
        <img v-bind:src="result.avatar_url" v-bind:alt="result.login" class="result__avatar" />
        <p class="result__bio">{{result.bio}}</p>
        <br>
        <a v-bind:href="result.blog" class="result__blog">{{result.blog}}</a>
    </div>
    `
})