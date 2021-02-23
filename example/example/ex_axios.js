import axios from 'axios';

const REMOTE_URL_SERVER = '127.0.0.1';
const REMOTE_PORT = 3000;

const data = JSON.stringify({
    todo: 'Buy the milk'
});

const getBreeds = async () => {
    try {
       /* return await axios.get(`http://${REMOTE_URL_SERVER}:${REMOTE_PORT}/page`,{
            params:{
                param:123
            }
        })*/
        return await axios.post(`http://${REMOTE_URL_SERVER}:${REMOTE_PORT}/page`,data)
    } catch (error) {
        console.error(error)
    }
};



const countBreeds = async () => {
    const breeds = await getBreeds()
    if (breeds.data.message) {
        console.log(`Got ${Object.entries(breeds.data.message).length} breeds`)
    }
}
countBreeds();