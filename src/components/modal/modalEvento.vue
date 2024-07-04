<template>
    <v-dialog  transition="dialog-top-transition" width="80%" persistent>
        

        <v-card class="px-4 py-4">
        <span class="d-flex justify-end">
                    <v-icon class="pa-3" @click="close">
                    mdi-close-circle-outline
                    </v-icon>
                </span>
        <h1 class="text-center">Cadastrar Evento</h1>
        <br>
       
            
          
            <v-text-field v-model="eventoSelecionado.nome" label="Nome" outlined/>
            <v-text-field v-model="eventoSelecionado.descricao" label="descrição" outlined/>
            <v-select
            label="Categoria"
            :items="['Pessoal','Saúde', 'Educação', 'Profissional']"
            v-model="eventoSelecionado.categoria"
            />
            <v-text-field :readonly="eventoSelecionado.paraEditar" type="date" v-model="eventoSelecionado.dataInicio" label="Data inicio" outlined/>
            <v-text-field  :readonly="eventoSelecionado.paraEditar" v-mask="'##:##'" type="text" v-model="eventoSelecionado.horarioInicio" label="horario inicio" outlined/>
            <v-text-field :readonly="eventoSelecionado.paraEditar" type="date" v-model="eventoSelecionado.dataFim" label="Data inicio" outlined/>
            <v-text-field :readonly="eventoSelecionado.paraEditar"  v-mask="'##:##'" type="text" v-model="eventoSelecionado.horarioFim" label="horario inicio" outlined/>
            <v-alert
        density="compact"
      v-if="alertaDelete"
        title="Deletar agendamento"
        type="warning"
      ><span>Tem certeza que deseja deletar? </span><v-btn variant="plain" @click="apagarEvento">Clique aqui para deletar </v-btn></v-alert>
            
            <v-btn v-if="!eventoSelecionado.paraEditar" class="primary" @click="enviarEvento">Salvar</v-btn>
            <v-row v-else class="mt-3 justify-center mb-1"> <v-btn class="primary mr-2" @click="editaEvento">Salvar alterações</v-btn>
              <v-btn class="primary" @click="alertaDelete = true" >Deletar</v-btn></v-row>
            
           
           
            
            
      


        </v-card>
            <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
        >
          {{ message }}

          <template v-slot:actions>
            <v-btn
              color="blue"
              variant="text"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
        </v-dialog>
        
        
</template>

<script setup>
import { ref,defineEmits, onMounted,  } from 'vue';
import { useAppStore } from '@/store/app';
import { postEvento, putEvento, deleteEvento } from '@/modules/eventosMethods';
  
 

      const appDB = useAppStore()
      var eventoSelecionado = computed(() => {
  return appDB.eventoSelecionado;
});



const message = ref('')
      const timeout = ref(2000)
      const snackbar = ref(false)
      const alertaDelete = ref(false)


const formData = ref({
  nome: '',
  dataInicio: null,
  dataFim: null,
  horarioInicio: null,
  horarioFim: null,
  descricao: '',
  categoria: ''

});
const dataHoraJuntos = ref('');
const emit = defineEmits(['close'])
const modal = ref(true)
const close = (()=>{
  alertaDelete.value = false
    emit('close', false);

})
const editaEvento = (()=>{
  let form = {...appDB.eventoSelecionado}

    
    const dataInicio = form.dataInicio;
    const horarioInicio = form.horarioInicio;
    const horarioFim = form.horarioFim;
    const dataFim = form.dataFim
    let body = {
        start: `${dataInicio}T${horarioInicio}:00`,
        end: `${dataFim}T${horarioFim}:00`,
        title: form.nome,
        content: form.descricao,
        class: form.categoria
    }

    putEvento(body).then(()=>{
      message.value = 'Alterações salva'
      snackbar.value = true
      setTimeout(function() {
            close();
                            }, 3000);

    }).catch(()=>{
      message.value = 'Erro ao alterar agendamento, tente novamente'
      snackbar.value = true
    })
  
})
const apagarEvento = (()=>{
  let form = {...appDB.eventoSelecionado}

    
    const dataInicio = form.dataInicio;
    const horarioInicio = form.horarioInicio;
    const horarioFim = form.horarioFim;
    const dataFim = form.dataFim
    let body = {
        start: `${dataInicio}T${horarioInicio}:00`,
        end: `${dataFim}T${horarioFim}:00`,
        title: form.nome,
        content: form.descricao,
        class: form.categoria
    }

    deleteEvento(body).then(()=>{
      message.value = 'Agendamento removido'
      snackbar.value = true
      setTimeout(function() {
            close();
                            }, 3000);

    }).catch(()=>{
      message.value = 'Erro ao remover agendamento, tente novamente'
      snackbar.value = true
    })
  
})
const enviarEvento = (()=>{
  
    let form = {...appDB.eventoSelecionado}

    
    const dataInicio = form.dataInicio;
    const horarioInicio = form.horarioInicio;
    const horarioFim = form.horarioFim;
    const dataFim = form.dataFim
    let body = {
        start: `${dataInicio}T${horarioInicio}:00`,
        end: `${dataFim}T${horarioFim}:00`,
        title: form.nome,
        content: form.descricao,
        class: form.categoria
    }
    postEvento(body).then(()=>{
      message.value = 'Agendamento salvo'
      snackbar.value = true
      setTimeout(function() {
            close();
                            }, 3000);

    }).catch(()=>{
      message.value = 'Erro ao salvar, tente novamente'
      snackbar.value = true
    })

 
  

})
onMounted(()=>{
   
    
})

</script>

<style>

</style>