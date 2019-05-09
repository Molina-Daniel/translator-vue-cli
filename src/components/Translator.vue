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
// var socket = io();

export default {
  name: "Translator",
  data() {
    return {
      textToTranslate: "",
      translation: ""
    };
  },
  methods: {
    translateMe() {
      socket.emit("textToTranslate", this.textToTranslate);
      this.textToTranslate = "";
    }
  },
  mounted() {
    socket.on("translated", data => (this.translation = data));
  }
};
</script>

<style>
</style>
