// Utilities
import { URL_API } from '../../ennviroments.js';
import { defineStore } from 'pinia'
import axios from 'axios';

export const useAppStore = defineStore('app', {
  state: () => ({
    usuario: {},
    eventos: [],
    eventoSelecionado: {}
  }),
  actions: {
    async login(usuario, senha) {
      return await axios.post(`${URL_API}login`,{email: usuario, senha: senha}, null).then((resp)=>{
          this.usuario = resp.data.user;
          this.eventos = resp.data.user.events.map(event => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end)
          }))

      })
    
  },

  setEventos(eventos){
    this.eventos = eventos.map(event => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end)
    }))

  },
  setEventosSelecionado(body){
    this.eventoSelecionado = body

  },
  resetEventoSelecionado(){
    this.eventoSelecionado = {}
  },

  resetUsuario(){
    this.usuario = {},
    this.eventos = []
  }
  }
})
