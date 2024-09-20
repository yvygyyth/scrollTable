
export const cellStyle = (column) => {
    return {
        display:'flex',
        justifyContent: column.align || 'center'
    };
};