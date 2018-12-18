const SERVER_LOCATION = 'https://spinefeed.azurewebsites.net'; //'http://localhost:7071'
const SPINEFEED_URL = `${SERVER_LOCATION}/api/article`;

const app = new Vue({
    el: '#app',
    data: { 
        article: '',
        markup: ''
    },
    methods: {
        getFeedback: async (contentType, output) => {
            try {
                const hasArticleText = app.article && app.article.length > 0;
                const hasType = app.type && app.type.length > 0;

                if(hasArticleText && hasType) {
                    const url = `${SPINEFEED_URL}?type=${app.type}&output=html`;
                    const headers = { 'Content-Type': 'application/json' };
                    const data = app.article;
        
                    const response = await axios.post(url, data, headers);
                    
                    app.markup = response.data.details;
                } else {
                    alert('Please enter your article text and select a type.');
                }
            } catch(ex) {
                console.log(ex);
            }
        }
    }
})