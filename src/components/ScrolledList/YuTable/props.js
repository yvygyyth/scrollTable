export const basicProps = {
    columns: {
        type: Array,
        required: true,
        default: () => [],
    },
    dataSource: {
        type: Array,
        required: true,
        default: () => [],
    },
    scroll:{
        type:Object,
        default: () => {
            return{
                x:'auto',
                y:'auto'
            }
        },
    },
    forKey:{
        type:String,
        default:'id'
    }
};
  