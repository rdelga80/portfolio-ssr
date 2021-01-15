import { cloneDeep, each, random } from 'lodash'

const initialState = {
  errors: [],
  form: {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  },
  valueCheck1: '',
  valueCheck2: '',
  robotCheck: '',
  subjectOptions: [
    {
      label: 'Choose Subject',
      value: '',
      disabled: true
    },
    {
      label: 'I have a question about VueJs',
      value: 'question'
    },
    {
      label: 'I need a consultation about Unit Testing or some other frontend issue',
      value: 'consultation'
    },
    {
      label: 'I\'m interested in private or group lessons',
      value: 'lessons'
    },
    {
      label: 'Something else...',
      value: 'other'
    }
  ],
  showSubmit: false
}

export const state = () => ({ ...initialState })

export const getters = {
  form: ({ form }) => form
}

export const actions = {
  generateRobotCheck({ commit }) {
    const valueCheck1 = random(0, 10)
    const valueCheck2 = random(0, 10)

    commit('SET_STATE_VALUE', { type: 'valueCheck1', value: valueCheck1 })
    commit('SET_STATE_VALUE', { type: 'valueCheck2', value: valueCheck2 })
  },
  handleShowSubmit({ commit, dispatch, state }) {
    commit('SET_STATE_VALUE', { type: 'showSubmit', value: !state.showSubmit })

    dispatch('generateRobotCheck')
  },
  resetState({ commit }) {
    commit('RESET_STATE', cloneDeep(initialState))
  },
  setFormValue({ commit }, { type, value }) {
    commit('SET_FORM_VALUE', { type, value })
  },
  setRobotCheckValue({ commit }, { target: { value } }) {
    commit('SET_STATE_VALUE', { type: 'robotCheck', value })
  },
  async submitForm({ dispatch, state }) {
    try {
      await this.$axios.post('/sendEmail', { ...state.form })

      dispatch('resetState')
    } catch (e) {
      console.log(e)
    }
  }
}

export const mutations = {
  RESET_STATE(state, _initialState) {
    each(_initialState, (value, item) => {
      state[item] = value
    })
  },
  SET_FORM_VALUE(state, { type, value }) {
    state.form[type] = value
  },
  SET_STATE_VALUE(state, { type, value }) {
    state[type] = value
  }
}
