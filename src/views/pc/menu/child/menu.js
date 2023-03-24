const menus = [
  {
    step: '信息入库',
    list: [
      [
        [
          {
            title: '基础信息',
            createRoute: '',
            permissionKey: 'Entrance:CustomerSettings',
            icon: require('../../../../assets/images/pc/home/menu/icon-base.png'),
            unread: 12
          }
        ]
      ]
    ]
  },
  {
    step: '创建合作',
    list: [
      [
        [
          {
            title: '商机管理',
            createRoute: '',
            permissionKey: 'Entrance:BizsOpportunity',
            icon: require('../../../../assets/images/pc/home/menu/icon-opportunity.png')
          },
          {
            title: '立项',
            createRoute: '',
            permissionKey: 'Entrance:ProjectApproval',
            icon: require('../../../../assets/images/pc/home/menu/icon-project.png')
          }
        ],
        [
          {
            title: '立项',
            createRoute: '',
            permissionKey: 'Entrance:UniversalProjectApproval',
            icon: require('../../../../assets/images/pc/home/menu/icon-project.png')
          }
        ]
      ]
    ]
  },
  {
    step: '合同管理',
    list: [
      [
        [
          {
            title: '销售合同',
            createRoute: '',
            permissionKey: 'Entrance:SalesContractReview',
            icon: require('../../../../assets/images/pc/home/menu/icon-saleContract.png')
          },
          {
            title: '成本合同',
            createRoute: '',
            permissionKey: 'Entrance:CostContract',
            icon: require('../../../../assets/images/pc/home/menu/icon-costContract.png')
          }
        ],
        [
          {
            title: '销售合同',
            createRoute: '',
            permissionKey: 'Entrance:SalesOtherContract',
            icon: require('../../../../assets/images/pc/home/menu/icon-saleContract.png')
          },
          {
            title: '成本合同',
            createRoute: '',
            permissionKey: 'Entrance:CostContract',
            icon: require('../../../../assets/images/pc/home/menu/icon-costContract.png')
          }
        ]
      ]
    ]
  },
  {
    step: '业务执行',
    list: [
      [
        [
          {
            title: '开户',
            createRoute: '',
            permissionKey: 'Entrance:CustomerAccount',
            icon: require('../../../../assets/images/pc/home/menu/icon-account.png')
          },
          {
            title: '下单',
            createRoute: '',
            permissionKey: 'Entrance:Order',
            icon: require('../../../../assets/images/pc/home/menu/icon-order.png')
          },
          {
            title: '客户补返单',
            createRoute: '',
            permissionKey: 'Entrance:BackOrder',
            icon: require('../../../../assets/images/pc/home/menu/icon-order.png')
          },
          {
            title: '批量撤改单',
            createRoute: '',
            permissionKey: 'Entrance:BatchReOrder',
            icon: require('../../../../assets/images/pc/home/menu/icon-batchReOrder.png')
          }
        ],
        [
          {
            title: '销售订单',
            createRoute: '',
            permissionKey: 'Entrance:SaleOrder',
            icon: require('../../../../assets/images/pc/home/menu/icon-saleOrder.png')
          },
          {
            title: '售后订单',
            createRoute: '',
            permissionKey: '',
            icon: require('../../../../assets/images/pc/home/menu/icon-afterSaleOrder-gray.png'),
            noOpen: true
          },
          {
            title: '采购订单',
            createRoute: '',
            permissionKey: 'Entrance:CIMSAfterPurchaseOrder',
            icon: require('../../../../assets/images/pc/home/menu/icon-purchaseOrder.png')
          },
          {
            title: '采购退货单',
            createRoute: '',
            permissionKey: '',
            icon: require('../../../../assets/images/pc/home/menu/icon-afterPurchaseOrder.png')
          }
        ]
      ]
    ]
  },
  {
    step: '结算管理',
    list: [
      [
        [
          {
            title: '内部对账',
            createRoute: '',
            permissionKey: 'Entrance:Statement',
            icon: require('../../../../assets/images/pc/home/menu/icon-internalCheck.png')
          },
          {
            title: '客户侧结算',
            createRoute: 'Entrance:OuterStatement',
            permissionKey: 'Entrance:OuterStatement',
            icon: require('../../../../assets/images/pc/home/menu/icon-customerSettlement.png')
          },
          {
            title: '成本侧结算',
            createRoute: '',
            permissionKey: 'Entrance:CSOrder',
            icon: require('../../../../assets/images/pc/home/menu/icon-costSettlement.png')
          }
        ],
        [
          {
            title: '内部结算',
            createRoute: '',
            permissionKey: 'Entrance:Statement',
            icon: require('../../../../assets/images/pc/home/menu/icon-internalCheck.png')
          },
          {
            title: '客户侧结算',
            createRoute: '',
            permissionKey: 'Entrance:OuterStatement',
            icon: require('../../../../assets/images/pc/home/menu/icon-customerSettlement.png')
          },
          {
            title: '成本侧结算',
            createRoute: '',
            permissionKey: 'Entrance:CSOrder',
            icon: require('../../../../assets/images/pc/home/menu/icon-costSettlement-gray.png'),
            noOpen: true
          }
        ]
      ],
      [
        [
          {
            title: '结算单盖章',
            createRoute: '',
            permissionKey: 'Entrance:StatementStamp',
            icon: require('../../../../assets/images/pc/home/menu/icon-stamp.png')
          }
        ]
      ]
    ]
  },
  {
    step: '款票管理',
    list: [
      [
        [
          {
            title: '发票申请',
            createRoute: '',
            permissionKey: 'Entrance:TicketReview',
            icon: require('../../../../assets/images/pc/home/menu/icon-invoice.png')
          },
          {
            title: '发票登记',
            createRoute: '',
            permissionKey: '',
            icon: require('../../../../assets/images/pc/home/menu/icon-invoiceRegistration-gray.png'),
            noOpen: true
          },
          {
            title: '收款登记',
            createRoute: '',
            permissionKey: 'Entrance:RegisterForm',
            icon: require('../../../../assets/images/pc/home/menu/icon-registerForm.png')
          },
          {
            title: '业务请款',
            createRoute: '',
            permissionKey: 'Entrance::CustPayment',
            icon: require('../../../../assets/images/pc/home/menu/icon-businessRequest.png')
          },
          {
            title: '回款管理',
            createRoute: '',
            permissionKey: 'Entrance:BackPayment',
            icon: require('../../../../assets/images/pc/home/menu/icon-receipt.png')
          },
          {
            title: '支出管理',
            createRoute: '',
            permissionKey: '',
            icon: require('../../../../assets/images/pc/home/menu/icon-payment-gray.png'),
            noOpen: true
          }
        ]
      ]
    ]
  }
];

export default menus;
