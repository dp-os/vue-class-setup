<script lang="ts">
import { Setup } from 'vue-class-setup'

@Setup
class Base {
    public count = 0;
    public get text() {
        return String(this.count);
    }
    public add() {
        this.count++;
    }
}

@Setup
class User extends Base {
    public get text2() {
        return String(this.count) + 'user';
    }
}

@Setup
class Blog extends Base {
    public get text2() {
        return String(this.count) + 'blog';
    }
}

@Setup
class Home {
    public user = new User();
    public blog = new Blog();
    public get total() {
        return this.user.count + this.blog.count;
    }
}

</script>
<script lang="ts" setup>
const home = new Home();
</script>
<template>
    <div>
        <p class="user-count">{{ home.user.count }}</p>
        <p class="blog-count">{{ home.blog.count }}</p>
        <p class="total">{{ home.total }}</p>
        <p class="user-text">{{ home.user.text }}</p>
        <p class="blog-text">{{ home.blog.text }}</p>
        <p class="user-text2">{{ home.user.text2 }}</p>
        <p class="blog-text2">{{ home.blog.text2 }}</p>
        <button class="blog-add" @click="home.blog.add">Add</button>
        <button class="user-add" @click="home.user.add">Add</button>
    </div>
</template>