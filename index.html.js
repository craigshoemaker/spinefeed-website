const SERVER_LOCATION = 'https://spinefeed.azurewebsites.net'; //'http://localhost:7071'
const SPINEFEED_URL = `${SERVER_LOCATION}/api/article`;

const app = new Vue({
    el: '#app',
    data: { 
        article: '',
        markup: '',
        isLoading: false
    },
    methods: {

        isValidType: (type) => {
            const types = {
                quickstart: true,
                tutorial: true,
                overview: true,
            }
    
            return !!types[type];
        },

        getFeedback: async function (contentType, output) {
            try {
                const hasArticleText = app.article && app.article.length > 0;

                app.isLoading = false;
                
                if(hasArticleText) {
                    type = this.getArticleType(app.article);
                    const url = `${SPINEFEED_URL}?output=html`;
                    const headers = { 'Content-Type': 'application/json' };
                    const data = app.article;
                    
                    app.markup = '';
                    app.isLoading = true;
                    const response = await axios.post(url, data, headers);
                    app.isLoading = false;
                    
                    app.markup = response.data.details;
                } else {
                    alert('Invalid article type. Spinefeed only provides feedback for Quickstarts, Tutorials, and Overview articles.\n\nYou can change the article type by updating the "ms.topic" field in the article metadata.');
                }

            } catch(ex) {
                console.log(ex);
            }
        }
    }
})