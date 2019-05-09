<template>
  <div>
    <h1>Words Trainer APP</h1>

    <div>
      <form @submit.prevent="translateMe" action="get">
        <input
          v-model="textToTranslate"
          type="text"
          name="input"
          id="input"
          placeholder="Type a word to translate..."
        >
        <button type="submit" name="input" id="translate">Translate!</button>
      </form>
    </div>

    <div>
      <div id="word"></div>
      <div id="translation">
        <p>{{ translation }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

// var socket = io();

export default {
  name: "Translator",
  data() {
    return {
      textToTranslate: "",
      translation: "",
      socket: io("localhost:8000")
    };
  },
  methods: {
    translateMe() {
      this.socket.emit("textToTranslate", this.textToTranslate);
      this.textToTranslate = "";
    }
  },
  created() {
    // socket = io();
  },
  mounted() {
    this.socket.on("translated", data => (this.translation = data));
  }
};
</script>

<style>
</style>
