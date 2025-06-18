<script setup>
import { Search } from '@element-plus/icons-vue'
import {getClassApi,getProductListApi} from './apis/home'
import {ref} from 'vue'
const classList=ref([])
const class_mark=ref(1)
const total=ref(0)
const getClass=async()=>{
const res=await getClassApi()
if(res.code===200){
  classList.value=res.data.list
}
}
getClass()
const selectMark=(id)=>{

}
const product_list=ref([])
const searchFilter=ref({
  page:1,
  limit:30,
  class_id:1,
  search:''
})
const changeClass=async(id)=>{
searchFilter.value.class_id=id
  class_mark.value=id

await getProductList()
}
const getProductList=async()=>{
const res=  await getProductListApi(searchFilter.value)
if(res.code===200){
  product_list.value=res.data.list
  total.value=res.data.total
}

}
getProductList()
const searchProduct=()=>{
  getProductList()
}
const clearGetProduct=async ()=>{
  searchFilter.value={
    page:1,
  limit:30,
  class_id:1,
  search:''
  }
  await getProductList()
}
const handleSizeChange=async (val)=>{
searchFilter.value.limit=val
await getProductList()

}
//改变页码
const handleCurrentChange=async (val)=>{
searchFilter.value.page=val
await getProductList()
}
</script>

<template>
  <div class="home">
    <div class="logo">
      <img src="./assets/logo.png" alt="logo">
    </div>
    <div class="search">
      <el-input v-model="searchFilter.search" :placeholder="$t('search.search_message')" clearable @clear="clearGetProduct">
        <template #append>
          <el-button :icon="Search" @click="searchProduct"/>
        </template>
      </el-input>
    </div>
    <div class="product_class">
      <div class="product_class_item">
        <div class="item_title" v-for="(item,index) in classList" :key="index" @click="selectMark(changeClass(item.id))" :class="{active:class_mark===item.id  }">
          <p>{{ item.name }}</p>
        </div>
      </div>

    </div>
    <div class="product_list">
      <div class="product_list_item" v-for="(item,index) in product_list" :key="index">
        <h5>{{ item.name }}</h5>
        <p>Name: <span>{{ item.name_en }}</span></p>
        <p>CAS: <span>{{ item.cas }}</span></p>
      </div>
    </div>
     <el-pagination
      :page-sizes="[30, 60, 120, 240]"
        v-model:page-size="searchFilter.limit"
      :disabled="disabled"
      :background="background"
      layout="sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <div class="footer_nav">
      <p>Copyright © 2025 陕西缔都医药化工</p>
    </div>
  </div>
</template>

<style scoped lang="less">
.home {
  .logo {
    display: flex;
    justify-content: start;
    padding-top: 20px;
    padding-left: 50px;
    box-sizing: border-box;
    width: 100%;
    height: 100px;

    img {
      width: 150px;
      height: 100%;
    }
  }

  .search {
    margin-top: 20px;
    display: flex;
    justify-content: center;

    // width:400px;
    :deep(.el-input) {
      outline: none;
      width: 400px;
      height: 50px;

      .el-input-group__append {
        background-color: #1E50AE;
        width: 60px;
        font-size: 20px;

        .el-icon {
          color: #ffffff;
        }
      }
    }
  }

  .product_class {
    margin-top: 20px;

    .product_class_item {

      display: flex;
      justify-content: center;
      gap: 20px;

      .item_title {
        text-align: center;
        height: 50px;
        line-height: 50px;
        padding: 0 15px;
        box-sizing: border-box;
cursor: pointer;

        p {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
        }
      }

      .active {
        background-color: #1E50AE;
        border-radius: 20px;
        color: #ffffff;
      }
    }
  }

  .product_list {
    padding: 40px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-row-gap: 20px;
    grid-column-gap: 20px;

    .product_list_item {
      padding: 20px;
      box-sizing: border-box;
      // width: 350px;
      height: 160px;
      border: 1px solid #ccc;
    }
  }
.el-pagination{
  justify-content: center;
}
  .footer_nav {
    margin-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    height: 200px;
    width: 100%;
    color: #ffffff;
  }

  @media (max-width: 520px) {
    .logo {
      justify-content: center;
    }

    .product_class {
      .product_class_item {
        gap: 2px;

        .item_title {
          padding: 0 5px;
        }
      }
    }

    .search {
      .el-input {

        width: 350px;
      }
    }

    .product_list {
      padding: 20px 10px;
    }
  }
}
</style>
