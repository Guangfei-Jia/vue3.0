/*
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-08-02 15:14:38
 * @LastEditors: fei
 * @LastEditTime: 2021-08-04 14:09:04
 */
import { ref, getCurrentInstance, nextTick } from 'vue';

export default function baseDialog( refName?:string, formAdd?:any, formData?:any ) {
    const { proxy } = getCurrentInstance() as any;

    const dialogWidth = ref("100px"); //控制表单lab宽度

    const controlDialog = ref(false);
    //显示弹窗
    const showDialog = (data?: any) => {
        controlDialog.value = true;
        nextTick(()=>{
          if (data) {
            for (let key of formData.keys()) {
              formAdd[key] = data[key];
            }
          }
        })
     }
    //关闭弹窗
    const cancelDialog = (callBack?: () => void) => {
      if(refName){
        proxy.$refs[refName].resetFields();
      }
      controlDialog.value = false;
    };

    return {
        dialogWidth,
        controlDialog,
        showDialog,
        cancelDialog,
    }
}