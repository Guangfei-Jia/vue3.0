/*
 * @Descripttion: 公用分页逻辑
 * @version: 
 * @Author: fei
 * @Date: 2021-06-28 14:17:40
 * @LastEditors: fei
 * @LastEditTime: 2021-06-28 14:30:22
 */
import { ref, reactive } from "vue";

export default function pageContral() {
  const currentPage = ref(1);
  const pageData = reactive({
    pageSize: 10,
    pageNum: 1,
    pageSizes: [2, 10, 20, 50, 100],
    total: 0,
  });
  const changeSize = (value: any, callback:() => void): void => {
    pageData.pageSize = value;
    callback();
  };
  const changePage = (value: any, callback:() => void): void => {
    pageData.pageNum = value;
    callback();
  }
  const changeTotal = (value: number): void => {
    pageData.total = value;
  }
  return {
    currentPage,
    pageData,
    changeSize,
    changePage,
    changeTotal
  }
}