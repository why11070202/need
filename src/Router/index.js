/**
 * @author v4 <lucky6616888@163.com>
 * Created by v4 on 2019-06-010 09:45
 */
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  base: '/gridding/',
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['Page/Home'], resolve),
      // redirect: '/menu',
      meta: {
        title: '模拟角色登陆'
      },
      children: [
        {
          path: 'menu',
          component: resolve => require(['Page/Menu'], resolve),
          meta: {
            title: '综合网格收入牵引体系'
          },
          children: [
            {
              path: 'index',
              component: resolve => require(['Page/Index'], resolve),
              meta: {
                title: '综合网格收入牵引体系'
              },
              children: [

              ]
            },
            {
              path: 'traction',
              component: resolve => require(['Page/Traction'], resolve),
              meta: {
                title: '网格收入牵引'
              },
              children: [
                {
                  path: ':month/:type/:name',
                  component: resolve => require(['Page/Traction/Child'], resolve),
                  meta: {
                    title: '分公司'
                  },
                  children: [
                    {
                      path: 'grid',
                      component: resolve => require(['Page/Traction/Child/Grid'], resolve),
                      meta: {
                        title: '网格'
                      },
                      children: [
                        {
                          path: ':street',
                          component: resolve => require(['Page/Traction/Child/Street'], resolve),
                          meta: {
                            title: '一线经理总表'
                          },
                          children: [
                            {
                              path: 'manager',
                              component: resolve => require(['Page/Traction/Child/Manager'], resolve),
                              meta: {
                                title: '一线经理明细'
                              },
                              children: [
                                {
                                  path: ':user/:incomeItem',
                                  component: resolve => require(['Page/Traction/Child/User'], resolve),
                                  meta: {
                                    title: '销售经理收入'
                                  },
                                  children: [
                                    {
                                      path: ':source',
                                      component: resolve => require(['Page/Traction/Child/Source'], resolve),
                                      meta: {
                                        title: '渠道'
                                      },
                                      children: [
                                        {
                                          path: ':sourceType',
                                          component: resolve => require(['Page/Traction/Child/SourceType'], resolve),
                                          meta: {
                                            title: '渠道明细'
                                          },
                                          children: [
                                            {
                                              path: 'text',
                                              component: resolve => require(['Page/Traction/Child/Text'], resolve),
                                              meta: {
                                                title: '销售场景事件库'
                                              }
                                            },
                                            {
                                              path: ':address',
                                              component: resolve => require(['Page/Traction/Child/Address'], resolve),
                                              meta: {
                                                title: '五级地址'
                                              },
                                              children: [
                                                {
                                                  path: 'synergia',
                                                  component: resolve => require(['Page/Traction/Child/Synergia'], resolve),
                                                  meta: {
                                                    title: '发起协同'
                                                  }
                                                }
                                              ]
                                            },
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              path: 'mark',
              component: resolve => require(['Page/Mark'], resolve),
              meta: {
                title: '家集客覆盖营销协同'
              },
              children: [
                {
                  path: 'construction/:id',
                  component: resolve => require(['Page/Mark/Construction'], resolve),
                  meta: {
                    title: '家集客覆盖营销协同施工进度2'
                  }
                }]
            },
            {
              path: 'maintain',
              component: resolve => require(['Page/Maintain'], resolve),
              meta: {
                title: '营装维协同作业'
              },
              children: [{
                path: 'progress',
                component: resolve => require(['Page/Maintain/Single/Progress'], resolve),
                meta: {
                  title: '营装维协调作业-装维进度2'
                }
              },
                {
                  path: 'statistical',
                  component: resolve => require(['Page/Maintain/report/Statistical'], resolve),
                  meta: {
                    title: '报表统计-装维退单'
                  }
                }
              ]
            },
            {
              path: 'business-install-maintain',
              component: resolve => require(['Page/BusinessInstallMaintain'], resolve),
              redirect: 'business-install-maintain/search',
              meta: {
                title: '营装维协同作业'
              },
              children: [
                {
                  path: 'business',
                  component: resolve => require(['Page/BusinessInstallMaintain/Child/Business'], resolve),
                  meta: {
                    title: '营业'
                  },
                  children: [
                    {
                      path: 'detail/:id',
                      component: resolve => require(['Page/BusinessInstallMaintain/Child/Business/Child/Detail'], resolve),
                      meta: {
                        title: '营业详情'
                      }
                    }
                  ]
                },
                {
                  path: 'install',
                  component: resolve => require(['Page/BusinessInstallMaintain/Child/Install'], resolve),
                  meta: {
                    title: '安装'
                  }
                },
                {
                  path: 'maintain',
                  component: resolve => require(['Page/BusinessInstallMaintain/Child/Maintain'], resolve),
                  meta: {
                    title: '维修'
                  }
                },
                {
                  path: 'report-form-statistics',
                  component: resolve => require(['Page/BusinessInstallMaintain/Child/ReportFormStatistics'], resolve),
                  meta: {
                    title: '报表统计'
                  },
                  children: [
                    {
                      path: ':customerType/:workOrderStatus',
                      component: resolve => require(['Page/BusinessInstallMaintain/Child/ReportFormStatistics/Child/Detail'], resolve),
                      meta: {
                        title: '详情'
                      }
                    }
                  ]
                },
                {
                  path: 'search',
                  component: resolve => require(['Page/BusinessInstallMaintain/Child/Search'], resolve),
                  meta: {
                    title: '搜索五级地址'
                  },
                  children: [
                    {
                      path: 'order-detail/:id',
                      component: resolve => require(['Page/BusinessInstallMaintain/Child/Search/Child/Detail/Address/OrderDetail'], resolve)
                    },
                    {
                      path: 'address/:address',
                      component: resolve => require(['Page/BusinessInstallMaintain/Child/Search/Child/Detail'], resolve),
                      meta: {
                        title: '五级地址详情'
                      },
                      children: [
                        {
                          path: ':type/:status',
                          component: resolve => require(['Page/BusinessInstallMaintain/Child/Search/Child/Detail/Address'], resolve),
                          meta: {
                            title: ''
                          },
                          children: [
                            {
                              path: ':id',
                              component: resolve => require(['Page/BusinessInstallMaintain/Child/Search/Child/Detail/Address/OrderDetail'], resolve)
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              path: 'cooperative',
              component: resolve => require(['Page/Cooperative'], resolve),
              meta: {
                title: '营装维协同作业-装维进度1'
              },
              children: [
                {
                  path: 'statistical',
                  component: resolve => require(['Page/Cooperative/Statistical'], resolve),
                  meta: {
                    title: '营装维协同作业-报表统计'
                  },
                  children: [
                    {
                      path: 'sdetail/:customerType/:workOrderStatus/:address?',
                      component: resolve => require(['Page/Cooperative/Sdetail'], resolve),
                      meta: {
                        title: '营装维协同作业-报表统计-装维退单'
                      }
                    }
                  ]
                },
                {
                  path: 'sdetail/:status',
                  component: resolve => require(['Page/Cooperative/Sdetail'], resolve),
                  meta: {
                    title: '营装维协同作业-报表统计-装维退单'
                  }
                }
              ]
            },
            {
              path: 'task',
              component: resolve => require(['Page/Task'], resolve),
              meta: {
                title: '网格任务协同'
              },
              children: [
                {
                  path: 'synergy/:id',
                  component: resolve => require(['Page/Task/Synergy'], resolve),
                  meta: {
                    title: '处理'
                  }
                },
                {
                  path: 'synergia/:address',
                  component: resolve => require(['Page/Task/Synergy/synergia'], resolve),
                  meta: {
                    title: '发起协同'
                  }
                },
                {
                  path: 'detail/:id',
                  component: resolve => require(['Page/Task/Detail'], resolve),
                  meta: {
                    title: '详情'
                  }
                }
              ]
            },
            {
              path: 'trench',
              component: resolve => require(['Page/Trench'], resolve),
              children: []
            },
            {
              path: 'synergia',
              component: resolve => require(['Page/Synergia'], resolve),
              meta: {
                title: '发起协同'
              },
              children: []
            },
            {
              path: 'business',
              component: resolve => require(['Page/Business'], resolve),
              redirect: 'business/add',
              children: [
                {
                  path: 'add',
                  component: resolve => require(['Page/Business/Child/Add'], resolve),
                  children: [
                    {
                      path: 'time',
                      component: resolve => require(['Page/Business/Child/Add/IndicatorPlan/Time'], resolve),
                      children: [
                        {
                          path: 'street/:district',
                          component: resolve => require(['Page/Business/Child/Add/IndicatorPlan/Time/Street'], resolve),
                          children: [
                            {
                              path: 'person/:street',
                              component: resolve => require(['Page/Business/Child/Add/IndicatorPlan/Time/Person'], resolve)
                            }
                          ]
                        }
                      ]
                    },
                    {
                      path: 'street/:district',
                      component: resolve => require(['Page/Business/Child/Add/IndicatorPlan/Street'], resolve),
                      children: [
                        {
                          path: 'person/:street',
                          component: resolve => require(['Page/Business/Child/Add/IndicatorPlan/Person'], resolve),
                          children: [
                            {
                              path: 'ditch/:managerAccount',
                              component: resolve => require(['Page/Business/Child/Add/IndicatorPlan/Ditch'], resolve),
                            }
                          ]
                        }
                      ]
                    },
                    {
                      path: 'participation',
                      component: resolve => require(['Page/Business/Child/Add/Participation'], resolve),
                      children: [
                        {
                          path: 'street/:district',
                          component: resolve => require(['Page/Business/Child/Add/Participation/Child/Street'], resolve),
                          children: [
                            {
                              path: 'person/:street',
                              component: resolve => require(['Page/Business/Child/Add/Participation/Child/Person'], resolve)
                            }
                          ]
                        }
                      ]
                    },
                    {
                      path: 'capacity',
                      component: resolve => require(['Page/Business/Child/Add/Capacity'], resolve),
                      children: [
                        {
                          path: ':district/:street/:person/:type',
                          component: resolve => require(['Page/Business/Child/Add/Capacity/Child'], resolve)
                        }
                      ]
                    },
                    {
                      path: 'quality',
                      component: resolve => require(['Page/Business/Child/Add/Quality'], resolve),
                      children: [
                        {
                          path: ':district/:street/:person/:type',
                          component: resolve => require(['Page/Business/Child/Add/Quality/Child'], resolve)
                        }
                      ]
                    }
                  ]
                },
                {
                  path: 'home',
                  component: resolve => require(['Page/Business/Child/Home'], resolve),
                  children: [
                    {
                      path: 'time',
                      component: resolve => require(['Page/Business/Child/Home/IndicatorPlan/Time'], resolve),
                      children: [
                        {
                          path: 'street/:district',
                          component: resolve => require(['Page/Business/Child/Home/IndicatorPlan/Time/Street'], resolve),
                          children: [
                            {
                              path: 'person/:street',
                              component: resolve => require(['Page/Business/Child/Home/IndicatorPlan/Time/Person'], resolve)
                            }
                          ]
                        }
                      ]
                    },
                    {
                      path: 'street/:district',
                      component: resolve => require(['Page/Business/Child/Home/IndicatorPlan/Street'], resolve),
                      meta: {
                        title: '网格'
                      },
                      children: [
                        {
                          path: 'person/:street',
                          component: resolve => require(['Page/Business/Child/Home/IndicatorPlan/Person'], resolve),
                          meta: {
                            title: '一线经理'
                          },
                          children: [
                            {
                              path: 'address/:account',
                              component: resolve => require(['Page/Business/Child/Home/IndicatorPlan/Address'], resolve),
                              meta: {
                                title: '五级地址'
                              },
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              path: 'peer',
              component: resolve => require(['Page/Peer'], resolve),
              children: []
            },
            {
              path: 'passenger-deal',
              component: resolve => require(['Page/PassengerAndDeal'], resolve),
              children: []
            },
            {
              path: 'portrayal',
              component: resolve => require(['Page/Portrayal'], resolve),
              redirect: 'portrayal/terminal',
              meta: {
                title: '客户消费特征画像'
              },
              children: [
                {
                  path: 'terminal',
                  component: resolve => require(['Page/Portrayal/Child/Terminal'], resolve),
                  meta: {
                    title: '终端'
                  }
                },
                {
                  path: 'combo',
                  component: resolve => require(['Page/Portrayal/Child/Combo'], resolve),
                  meta: {
                    title: '套餐'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/error',
      component: resolve => require(['Page/Error/500.vue'], resolve),
      meta: {
        title: '错误页面'
      }
    },
    {
      path: '/test',
      component: resolve => require(['Page/Test'], resolve),
      meta: {
        title: '测试页面'
      }
    },
    {
      path: '*',
      component: resolve => require(['Page/Error/404.vue'], resolve),
      meta: {
        title: '错误页面'
      }
    }
  ]
})
