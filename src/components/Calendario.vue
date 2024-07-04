<template>
    
    <v-card>
     
      
        <v-card-title><v-btn @click="modal = true">NOVO EVENTO</v-btn></v-card-title>
        
        <v-card-text>
            <vue-cal :events="eventos" 
          class=" vuecal--blue-theme"
          :on-event-click="handleEventClick"
          locale="pt-br"
          :time-from="8 * 60"
            :time-to="23 * 60"
            :time-step="60"
          
          

          
         />
            
        
        </v-card-text>
        <modal-evento v-model="modal"
        @close="closeModal"/>
       
      </v-card>
      
     
     
</template>

<script setup>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { ref, computed } from 'vue';
import { useAppStore } from '@/store/app';
import { getEventos } from '@/modules/eventosMethods';
  
 

      const appDB = useAppStore()

const modal = ref(false)
const closeModal = (()=>{
    modal.value = false
    appDB.resetEventoSelecionado()
    getEventos()
  
})

var eventos = computed(() => {
  return appDB.eventos;
});

const events = ref([
      {
        title: 'Ir ao médico',
        start: new Date('2024-07-04T10:00:00'),
        end: new Date('2024-07-04T12:00:00'),
       content :  'Hospital ' , 
    class :  'saude'
      },
      {
        title: 'Cinema',
        start: new Date('2024-07-05T14:00:00'),
        end: new Date('2024-07-05T16:00:00'),
        content :  'Com os amigos' ,
        class :  'health'
      },
      {
        class : "leisure",
            content
            : 
            "Comprar coisas",
            end
            : 
            new Date("2024-07-05T12:00:00"),
            start
            : 
            new Date("2024-07-05T11:00:00"),
            title
            : 
            "Ir ao mercado"
      }
    ]);
    
    

    function handleEventClick(event, e) {
      let horaIni = event.start.getHours()
      let minIni = event.start.getMinutes()
      let horaFim = event.end.getHours()
      let minFim = event.end.getMinutes()
      
      modal.value = true
      let model = {
        categoria: event.class,
        nome: event.title,
        descricao: event.content,
        dataInicio: event.start.toISOString().split('T')[0],
        horarioInicio: `${String(horaIni).padStart(2, '0')}:${String(minIni).padStart(2, '0')}`,
        dataFim: event.end.toISOString().split('T')[0],
        horarioFim: `${String(horaFim).padStart(2, '0')}:${String(minFim).padStart(2, '0')}`,
       
        paraEditar: true,

      }
      appDB.setEventosSelecionado(model)
     
      
    }


</script>
<style scoped>
.vuecal__event.leisure {
  background-color: rgba(253, 156, 66, 0.9);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
}

.vuecal__event.pessoal {
  background-color: rgba(66, 183, 233, 0.9);
  border: 1px solid rgb(46, 133, 233);
  color: #fff;
}
.educacao {
  background-color: #f3f0ff;
  color: #8b81d5;
}

.profissional {
  background-color: #f0f8ff;
  color: #1e90ff;
}

.viagem {
  background-color: #f7fff0;
  color: #9acd32;
}
</style>