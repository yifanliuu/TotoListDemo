<template>
  <div class='todo-wrapper'>
    <div class='todo-box'>
      <div class='todo-bar'>
        MANAGE YOUR TODO LIST
        <Button class='create-todo'>
          +
        </Button>
      </div>
      
      <div class='todo-main'>
        <ul class='todo-nav'>
          <li
            class='active'>
            <i class='color pending' />
            未完成
          </li>
          <li
            class= 'active'>
            <i class='color resolved' />
            已完成
          </li>
        </ul>
        <ul class='todo-list'>
          <li class="todo-item">
            <span class= "todo-info">
              aaa
            </span>
            <div class="todo-icon">
            </div>
          </li>
          <li class="todo-item">
            <span class= "todo-info">
              aaa
            </span>
            <div class="todo-icon">
            </div>
          </li>
          <li class="todo-item">
            <span class= "todo-info">
              aaa
            </span>
            <div class="todo-icon">
            </div>
          </li>
        </ul>
      </div>      
    </div>
  </div>
</template>



<style lang="scss" scoped>

.todo-wrapper {
  padding: 70px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.todo-box{
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.todo-bar {
  height: 40px;
  display: flex;
  border-radius: 5%;
  background-color: rgb(173, 205, 238);
  justify-content: space-between;
  padding: 5px;
  font-size: large;
}

.create-todo{
  cursor: pointer;
  font-size: larger;
  border-radius: 100%;
  border: 0px;
  width: 6%;
  display: flex;
  background-color:rgb(255, 245, 180);
}
.todo-main {
  display: flex;
  flex-direction: row;
  
}

.todo-nav {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
}

.todo-nav {
  li {
    cursor: pointer;
    width: 100px;
    display: flex;
    padding: 1rem;
  }
}

.todo-list {
  width: 600px;

}

.color {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  margin-right: 1rem;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.todo-item {
  display: flex;
  min-height: 3rem;
  line-height: 3rem;
  padding: 0.5rem 1rem;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  justify-content: space-between;
  align-items: center;
}

.todo-item {
  span {
    width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
    font-size: 1.2rem;
  }
}

.todo-icon {
  cursor: pointer;
  font-size: 1.5rem;
  transition: transform 0.2s ease;
  background-color: aqua;
}

.todo-icon+.todo-icon {
  margin-left: 1rem;
}

.todo-nav {
  li.active {
    border-bottom: 2px solid rgba(114, 111, 112, 0.5);
  }
}

.todo-icon:hover {
  transform: scale(1.2);
}

.pending {
  background-color: rgb(245, 147, 35);
}

.resolved {
  background-color: rgba(35, 58, 88, 0.836);
}

</style>
