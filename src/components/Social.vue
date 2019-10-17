<template>
  <div class="wrapper">
    <div>
      <VueInput
        v-model="iconpath"
        icon-left="link"
        placeholder="Путь к иконкам"
        style="width:100%; margin-bottom: .5rem"
      />
    </div>
    <div>
      <VueInput v-model="iconsize" icon-left="star" placeholder="Размер иконки" style="width:100%"/>
    </div>
    <hr>
    <div class="social-item" v-for="(item, key) in mysocials" :key="key">
      <VueSelect v-model="item.social" placeholder="Выбрать" style="width: 200px">
        <VueSelectButton
          v-for="social in socials"
          :key="social.name"
          :value="social"
          :label="social.name"
          @click="setPlaceholder(item, social)"
        />
      </VueSelect>
      <VueInput v-model="item.url" placeholder="url"/>
      <VueButton
        class="success"
        v-if="key == Object.keys(mysocials).length-1"
        @click="addItem"
      >Добавить</VueButton>
  
      <VueButton class="success" @click="removeItem(key)" v-if="key">Удалить</VueButton>
    </div>
    <hr>
    <div class="socials">
      <a :href="item.url" v-for="(item, key) in mysocials" :key="key">
        <img
          :src="'/icons/'+item.social.icon"
          v-if="item.social"
          :style="`height:${iconsize}px;width:${iconsize}px;`"
        >
      </a>
    </div>
    <div class="html-code">
      <VueInput
        type="textarea"
        rows="4"
        v-model="code"
        placeholder="Code"
        readonly
        style="width:100%"
      />
      <hr>
      <VueButton class="success" v-clipboard:copy="code" v-clipboard:success="copied">Скопировать</VueButton>
    </div>

    <VueModal v-if="open" class="small" @close="open = false">
      <div class="default-body" style="color: #42b983">Код скопирован</div>

      <div slot="footer" class="actions">
        <VueButton class="primary" @click="open = false">Ok</VueButton>
      </div>
    </VueModal>
  </div>
</template>

<script>
export default {
  name: "Social",
  computed: {
    code() {
      let html = '<div class="socials">';

      this.mysocials.map(item => {
        if (item.social) {
          html += `<a href="${item.url}">
          <img src="${this.iconpath + item.social.icon}" style="width: ${
            this.iconsize
          }px; height: ${this.iconsize}px;">
          </a>
          `;
        }
      });
      html += "</div>";
      html += `<styles>.social-item {
        display: flex;
        margin-bottom: 1rem;
      }
      .social-item > * {
        margin-right: .5rem;
      }

      .socials{
        display: flex;
        
      }

      .socials a {
        margin: 0 5px;
      }</styles>`;
      return html;
    }
  },
  data() {
    return {
      open: false,
      iconpath: "https://ko6du.csb.app/icons/",
      iconsize: 32,
      mysocials: [{ social: null, url: "" }],
      socials: [
        {
          name: "facebook",
          url: "https://www.facebook.com/",
          icon: "facebook.svg"
        },
        {
          name: "twitter",
          url: "https://www.twitter.com/",
          icon: "twitter.svg"
        },
        {
          name: "instagram",
          url: "https://www.instagram.com/",
          icon: "instagram.svg"
        },
        {
          name: "skype",
          url: "skype:логин?call",
          icon: "skype.svg"
        },
        {
          name: "whatsapp",
          url: "https://wa.me/",
          icon: "whatsapp.svg"
        },
        {
          name: "youtube",
          url: "https://www.youtube.com/",
          icon: "youtube.svg"
        }
      ]
    };
  },
  methods: {
    setPlaceholder(item, selected) {
      item.url = selected.url;
    },
    addItem() {
      this.mysocials.push({ social: null, url: "" });
    },
    removeItem(key) {
      this.$delete(this.mysocials, key);
    },
    copied() {
      this.open = true;
    }
  }
};
</script>

<style scoped>
.wrapper {
  max-width: 960px;
  margin: 0 auto;
}
.social-item {
  display: flex;
  margin-bottom: 1rem;
}
.social-item > * {
  margin-right: 0.5rem;
}

.socials {
  display: flex;
}

.socials a {
  margin: 0 5px;
}
</style>