import { defineStore } from 'pinia'

interface IHasError {
    monto:boolean,
    fecha:boolean,
    motivo:boolean,
}
interface IGastos{
    monto:number,
    fecha:string,
    motivo:string,
}

interface IGastosStore {
    monto:number,
    fecha:string,
    motivo:string,
    total: number,
    hasError: IHasError,
    gastos: IGastos[],
}
interface IActions{
    hasDataInInputs():boolean,
    addMontoInTotal():void,
    restartFields():void,
    insertGasto():void,
    addMontoInTotal():void,
    deleteItem(index:number):void,
    restartGastos():void,
}
interface IGetters{
    // getTotal(total): number
}

export const gastosStore = defineStore<string,IGastosStore,any,IActions>('gastos',{
    state: () => ({
        monto:0,
        fecha:'',
        motivo:'',
        total: 0,
        hasError: {
            monto:false,
            fecha:false,
            motivo:false,
            },
        gastos:[],
    }),
    actions:{
        insertGasto(){
            if(!this.hasDataInInputs()) return
                
            
                this.gastos.push({
                    motivo: this.motivo,
                    fecha: this.fecha,
                    monto: this.monto
                })
                this.addMontoInTotal()
                this.restartFields()
        
               

        },
        addMontoInTotal(){
            this.total += this.monto
        },
        deleteItem(index:number){
            this.total -= this.gastos[index].monto
            this.gastos.splice(index,1)
        },
        hasDataInInputs(){
            if(this.monto > 0)
                this.hasError.monto = false
            else
                this.hasError.monto = true

            if(this.fecha.length > 0)
                this.hasError.fecha = false
            else
                this.hasError.fecha = true
            
            if(this.motivo.length > 0 ) 
                this.hasError.motivo = false
            else
                this.hasError.motivo = true
            
            return (this.hasError.monto == true
                    || this.hasError.fecha == true
                    || this.hasError.motivo == true)?false:true
        },
        restartFields(){
            this.monto = 0,
            this.fecha = '',
            this.motivo = ''
        },
        restartGastos(){
            this.gastos = []
            this.total = 0
        },
    },
    getters:{
        getTotal:({total}:{total:number})=>total.toFixed(2)
    }
})
