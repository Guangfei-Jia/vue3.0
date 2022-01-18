/*
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-08-02 15:14:38
 * @LastEditors: fei
 * @LastEditTime: 2021-12-22 14:07:12
 */
import { ref, getCurrentInstance, nextTick, Ref } from 'vue';
interface dialogObject {
  dialogWidth: Ref<string>,
  controlDialog: Ref<boolean>,
  showDialog: (data?: any, callBack?: () => void) => void,
  cancelDialog: (callBack?: () => void) => void
}
/**
 * @name: 
 * @param {string} refName 弹窗内form名称
 * @param {any} formAdd form表单数据对象
 * @param {any} formData 需要重新赋值的对象
 * @return {string} dialogWidth 控制表单lab宽度
 * @return {boolean} controlDialog 控制dialog的显示隐藏
 * @return {Function} showDialog 显示函数dialog
 * @return {Function} cancelDialog 关闭doalog
 */
const baseDialog = (refName?: string, formAdd?: any, formData?: any): dialogObject => {
  const { proxy } = getCurrentInstance() as any;

  const dialogWidth = ref("100px");
  const controlDialog = ref(false);
  /**
   * @name: 显示log，若存在表单，为表单赋值
   * @param {any} data 需要回显的对象
   * @param {function} callBack 表单处理完的回调
   * @return {void}
   */
  const showDialog = (data?: any, callBack?: () => void): void => {
    controlDialog.value = true;
    nextTick(() => {
      if (data && formData && formAdd) {
        for (let key of formData.keys()) {
          formAdd[key] = data[key];
        }
      }
      callBack && callBack();
    })
  }
  /**
   * @name: 关闭log，若表单存在,重置表单
   * @param {function} callBack 关闭后回调，一般重新调用请求list数据
   * @return {void}
   */
  const cancelDialog = (callBack?: () => void): void => {
    if (refName) {
      proxy.$refs[refName].resetFields();
    }
    controlDialog.value = false;
    callBack && callBack();
  };

  return {
    dialogWidth,
    controlDialog,
    showDialog,
    cancelDialog,
  }
}
export default baseDialog;