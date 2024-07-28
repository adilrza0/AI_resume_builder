import axios from "axios";

// const API_KEY=import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient=axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL,
    headers:{
        'Content-Type':'application/json'
    }
})
axiosClient.interceptors.request.use(
    config => {
        
        const token = localStorage.getItem('token'); // Get token from localStorage
        console.log(token)
        if (token) {
            config.headers['Authorization'] = `${token}`; // Add token to headers
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const CreateNewResume=(data)=>axiosClient.post('/resume',data);

const GetUserResumes=()=>axiosClient.get('/resume');

const UpdateResumeDetail=(id,data)=>axiosClient.patch('resume/'+id,data)

const GetResumeById=(id)=>axiosClient.get('/resume/'+id)

const DeleteResumeById=(id)=>axiosClient.delete('/resume/'+id)

const Login=(data)=>axiosClient.post("/auth/login",data)

const Register =(data)=>axiosClient.post("/auth/register",data)

export default{
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById,
    Login,
    Register
}