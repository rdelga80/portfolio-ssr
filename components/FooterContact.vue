<template>
  <footer class="contact">
    <h3>
      VueJS have you twisted in knots? Do you have the basics down,
      but get confused with design patterns, unit testing, Typescript,
      or more advanced topics? Reach out!
    </h3>

    <form @submit.prevent="submitForm">
      <input
        :value="form.name"
        placeholder="Name"
        @input="setFormValue({ type: 'name', value: $event.target.value })"/>

      <input
        :value="form.email"
        placeholder="Email"
        @input="setFormValue({ type: 'email', value: $event.target.value })"/>

      <input
        :value="form.phone"
        placeholder="Phone"
        type="tel"
        @input="setFormValue({ type: 'phone', value: $event.target.value })"/>

      <div class="select-div">
        <select
          :value="form.subject"
          @change="setFormValue({ type: 'subject', value: $event.target.value })">
          <option
            v-for="subject in subjectOptions"
            :value="subject.value"
            :disabled="subject.disabled">
            {{ subject.label }}
          </option>
        </select>
      </div>

      <div class="message">
        <div>
          Message
        </div>

        <textarea
          :value="form.message"
          @input="setFormValue({ type: 'message', value: $event.target.value })"/>
      </div>

      <button
        v-if="!showSubmit"
        @click.prevent="handleShowSubmit">
        Submit
      </button>

      <div
        v-if="showSubmit"
        class="submit-section">
        <div class="question">
          Are you a robot? Answer this simple question to prove your humanity.
        </div>

        <div class="robot-check-row">
          {{ valueCheck1 }} + {{ valueCheck2 }} =

          <input
            :value="robotCheck"
            @input="setRobotCheckValue"
            class="input"/>
        </div>

        <button
          :disabled="!isCheckSame"
          type="submit">
          Submit
        </button>
      </div>
    </form>
  </footer>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'FooterContact',
  computed: {
    ...mapState({
      robotCheck: ({ contactFooter }) => contactFooter.robotCheck,
      showSubmit: ({ contactFooter }) => contactFooter.showSubmit,
      subjectOptions: ({ contactFooter }) => contactFooter.subjectOptions,
      valueCheck1: ({ contactFooter }) => contactFooter.valueCheck1,
      valueCheck2: ({ contactFooter }) => contactFooter.valueCheck2
    }),
    ...mapGetters({
      form: 'contactFooter/form'
    }),
    checkSum() {
      return this.valueCheck1 + this.valueCheck2
    },
    isCheckSame () {
      return parseInt(this.robotCheck) === this.checkSum
    }
  },
  methods: {
    ...mapActions({
      handleShowSubmit: 'contactFooter/handleShowSubmit',
      setFormValue: 'contactFooter/setFormValue',
      setRobotCheckValue: 'contactFooter/setRobotCheckValue',
      submitForm: 'contactFooter/submitForm'
    })
  }
}
</script>

<style lang="scss" scoped>
.contact {
  border: 2px solid white;
  color: white;
  padding: 1rem;

  h3 {
    margin-bottom: 1rem;
  }

  button {
    padding: 5px 8px;
    transition: background-color 240ms;

    &:focus {
      outline: none;
    }

    &[disabled] {
      color: #ccc;
      background-color: rgba(20, 20, 20, 0.4);
      transition: background-color 240ms;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    width: 100%;
    margin: 0 auto;

    .select-div::after {
      position: relative;
      right: -5px;
      content: '⇊';
    }

    select {
      width: calc(100% - 18px);
      color: white;
      border-bottom: 1px solid white;

      &:focus {
        outline: none;
      }
    }

    input {
      border-bottom: 1px solid white;
      padding-bottom: 2px;
      margin-bottom: 10px;
      color: white;

      &::placeholder {
        color: #ccc;
      }

      &:focus {
        outline: none;
      }
    }

    .message {
      margin-top: 12px;

      > div {
        color: #ccc;
      }

      textarea {
        color: white;
        padding: 5px;
        width: 100%;
        height: 4rem;
        border: 1px solid white;

        &:focus {
          outline: none;
        }
      }
    }
  }

  .question {
    margin-top: 22px;
    font-size: 0.7em;
  }

  .robot-check-row {
    display: flex;
    margin-bottom: 22px;
    justify-content: center;

    input.input {
      font-size: 1.3em;
      width: 25px;
      padding: 2px;
      margin: -5px 0 0 4px;
    }
  }

  .submit-section {
    margin: 0 auto;
    text-align: center;
  }
}
</style>
