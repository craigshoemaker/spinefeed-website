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
                contentType = 'quickstart';
                output = 'html';

                const url = `${SPINEFEED_URL}?type=${contentType}&output=${output}`;
                const headers = { 'Content-Type': 'application/json' };
                const data = app.article;
    
                const response = await axios.post(url, data, headers);
                
                app.markup = response.data.details;
            } catch(ex) {
                console.log(ex);
            }
        }
    }
})