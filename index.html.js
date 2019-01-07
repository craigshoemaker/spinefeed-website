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

        getArticleType: (content) => {
            const matches = content.match(/ms\.topic:(.*)/);
            let type = '';
            if(matches.length > 1) {
                type = matches[1].trim();
            }
            return type;
        },

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
                let type;
                let hasValidType;
                let showAlert = false;
                const hasArticleText = app.article && app.article.length > 0;

                app.isLoading = false;

                if(hasArticleText) {
                    type = this.getArticleType(app.article);
                    hasValidType = this.isValidType(type);
                } else {
                    showAlert = true;
                }
                
                if(hasArticleText && hasValidType) {
                    const url = `${SPINEFEED_URL}?type=${type}&output=html`;
                    const headers = { 'Content-Type': 'application/json' };
                    const data = app.article;
                    
                    app.markup = '';
                    app.isLoading = true;
                    const response = await axios.post(url, data, headers);
                    app.isLoading = false;
                    
                    app.markup = response.data.details;
                } else {
                    showAlert = true;
                }

                if(showAlert) {
                    alert('Invalid article type. Spinefeed only provides feedback for Quickstarts, Tutorials, and Overview articles. You can change the article type by updating the "ms.topic" field in the article metadata.');
                }
                
            } catch(ex) {
                console.log(ex);
            }
        }
    }
})