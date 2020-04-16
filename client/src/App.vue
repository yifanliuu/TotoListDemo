<template>
  <div id="app">
    <div id="nav">
      <a>
        Todo List
      </a>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: rgb(228, 227, 227);
}

#nav {
  padding: 30px;
  font-size: 300%;
}

#nav a {
  padding: 20px;
  font-style: normal;
}
</style>
