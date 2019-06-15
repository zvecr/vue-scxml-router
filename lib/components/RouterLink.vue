<template>
    <button @click="$router.send(event)"><slot></slot></button>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'a'
    },
    event:{
      type: String,
      default: 'navigate' 
    },
  }
}
</script>

<style>

</style>
