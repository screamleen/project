import Vue from 'vue';

const state = {
  exhibitor: {},
  lists: []
};

const getters = {
  getExhibitor: (state) => (id) => {
    return state.lists.find(exhibitor => exhibitor.exhibitor_info_id === parseInt(id));
  }
};

const mutations = {
  initList (state, lists) {
    state.lists = lists;
  },
  deleteExhibitor (state, id) {
    const index = state.lists.findIndex(exhibitor => exhibitor.exhibitor_info_id === id);
    if (index !== -1) {
      state.lists.splice(index, 1);
      Vue.prototype.$message({
        message: '删除成功！',
        type: 'success'
      });
    }
  },
  modifyExhibitor (state, update) {
    const exhibitor = state.lists.find(exhibitor => exhibitor.exhibitor_info_id === update.exhibitor_info_id);
    if (exhibitor) {
    }
  },
  initCurrentExhibitor (state, exhibitor) {
    state.exhibitor = exhibitor;
  },
  updateCurrentExhibitor (state, update) {
    Object.assign(state.exhibitor, update);
    console.log(state.exhibitor);
  },
  addExhibitor (state, exhibitor) {
    state.lists.push(exhibitor);
  }
};

const actions = {
  async initExhibitors ({ commit }, params) {
    commit('initList', params);
  },
  async deleteExhibitorAction ({ commit }, id) {
    commit('deleteExhibitor', id);
  },
  async modifyExhibitorAction ({ commit }, update) {
    commit('modifyExhibitor', update);
  },
  async initCurrentExhibitor ({ commit }, exhibitor) {
    commit('initCurrentExhibitor', exhibitor);
  },
  async updateCurrentExhibitor ({ commit }, exhibitor) {
    commit('updateCurrentExhibitor', exhibitor);
  },
  async addExhibitor ({ commit }, exhibitor) {
    commit('addExhibitor', exhibitor);
  }
};

const exhibitors = {
  state,
  getters,
  mutations,
  actions
};

export default exhibitors;
