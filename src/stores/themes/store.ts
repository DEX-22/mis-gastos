import {defineStore} from 'pinia'

export const themeStore = defineStore('theme',{
    state: ()=>({
        isDark:false,
        base: {
            light:'#EEEEEE',
            secondLight: '#787A91',
            dark:'#0F044C',
            secondDark:'#141E61'
        },
        button:{
            light:{
                primary:'btn btn-primary-outline',
                danger:'btn btn-danger-outline',
                warning:'btn btn-warning-outline',
                info:'btn btn-info-outline',
                secondary:'btn btn-secondary-outline',
                light:'btn btn-light-outline',
                dark:'btn btn-dark-outline'
            },
            dark:{
                primary:'btn btn-primary',
                danger:'btn btn-danger',
                warning:'btn btn-warning',
                info:'btn btn-info',
                secondary:'btn btn-secondary',
                light:'btn btn-light',
                dark:'btn btn-dark'
            }
        },

    }),
    actions:{

    }
})
