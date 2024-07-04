import { useAppStore } from '@/store/app';
import axios from 'axios';
import { URL_API } from '../../ennviroments.js';



function getEmail(){
    const appDb = useAppStore()
    return appDb.usuario.email

}

export function postEvento(body){
    let email = getEmail();

    return axios.post(`${URL_API}user/events/${email}`,body )
}
export function getEventos(body){
    let email = getEmail();
    const appDb = useAppStore()

    let resp = axios.get(`${URL_API}user/events/${email}`,body ).then((resp)=>{
        
        appDb.setEventos(resp.data)
    })
  
    return resp
}
export function putEvento(body){
    let email = getEmail();

    return axios.put(`${URL_API}user/events/${email}`,body )
}
export function deleteEvento(body){
    let email = getEmail();

    return axios.delete(`${URL_API}user/events/${email}`,{
        params: { start: body.start, end : body.end }
      } )
}