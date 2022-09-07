<script lang="ts" setup>
import {inject, reactive,ref, type InjectionKey, type Ref} from 'vue'
import {gastosStore} from '../stores/gastos/store'

import * as pdfMake from 'pdfmake/build/pdfmake.js'
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js'
import htmlToPdfMake from 'html-to-pdfmake'
import moment from 'moment'
import type { Content, TDocumentDefinitions } from 'pdfmake/interfaces'


const swal:any = inject('$swal')
const gStore = gastosStore()
const pdfTable:Ref = ref<HTMLDivElement>()

const exportToPdf = async  () => {

    if(gStore.gastos.length < 1){
        swal('Ingrese almenos un gasto para generar pdf')
        return
    }else{
        (pdfMake as any).vfs = pdfFonts.pdfMake.vfs    
        
        const html:Content = htmlToPdfMake(pdfTable.value?.innerHTML)
        
        const documentDefinition:{content:Content} = {content: html};

        // pdfMake.addVirtualFileSystem(pdfFonts)
        
            
        pdfMake.createPdf(documentDefinition).open()

    }

}

</script>
<template>
   <div class="container pt-3">
        <div class="row">
            <div class="col my-3">
                <h2 class="text-center">MIS GASTOS</h2>
            </div>
        </div>
        <div class="row ">
            <div class="col-12 col-md-4 ">
                <input v-model="gStore.motivo" type="text" class="form-control my-2" :class="{'error':gStore.hasError.motivo}" placeholder="escribe el motivo"  />
            </div>
            <div class="col-12 col-md-4 ">
                <input v-model="gStore.monto" type="number" class="form-control my-2" :class="{'error':gStore.hasError.monto}" min="1" step=".5"  />
            </div>
            <div class="col-12 col-md-4 ">
                <input v-model="gStore.fecha" type="date"  class="form-control my-2" :class="{'error':gStore.hasError.fecha}"/>
            </div>
            <div class="col-12 col-md-12 my-3">
                <div class="row justify-content-around">
                    <button class="col-auto btn btn-outline-warning "  @click="gStore.restartGastos"> <i class="bi bi-arrow-repeat" style="font-size: 2rem;" /> </button>
                    
                    <button class="col-auto btn btn-outline-danger "   @click="exportToPdf"> <i class="bi bi-file-earmark-pdf-fill" style="font-size: 2rem;" /> </button>
                    
                    <button class="col-auto btn btn-outline-primary "  @click="gStore.insertGasto">  <i class="bi bi-file-earmark-plus" style="font-size: 2rem;" /> </button>
                </div>
            </div>
        </div>
        <hr>
        <div class="row" ref="pdfTable" v-if="gStore.gastos.length > 0">
            <table class="table table-primary hover" >
                <thead class="table-dark">
                    <tr>
                        <th>#</th>
                        <th>FECHA</th>
                        <th>MOTIVO</th>
                        <th>MONTO</th>
                        <th class="text-center">
                            ELIMINAR
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(gasto,index) in gStore.gastos">
                        <td>{{index+1}}</td>
                        <td>{{moment(gasto.fecha).format('DD MMM YYYY')}}</td>
                        <td>{{gasto.motivo}}</td>
                        <td>{{gasto.monto.toFixed(2)}}</td>
                        <td class="text-center">
                            
                                <!-- <button class="btn btn-danger" > -->
                                    <i @click="gStore.deleteItem(index)"  class="bi bi-trash-fill text-danger" style="font-size: 1.5rem; cursor:pointer;"/>
                                <!-- </button> -->
                            
                        </td>
                    </tr>
                </tbody>
                <tfoot class="table-secondary ">
                    <tr>
                        <td></td>
                        <td></td>
                        <td>MONTO TOTAL</td>
                        <td>{{ gStore.getTotal }}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
   </div>
</template>
<style scoped>
.error{
    border: red 2px solid;   
}
td{
    color: #000;
}
</style>