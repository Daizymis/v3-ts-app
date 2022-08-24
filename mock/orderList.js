let orderList = {
    code: 200,
    message: 'success',
    data: {
        total: 100,
        'rows': [
            {
              id: 1,
              orderNo: "01",
              date: "2016-05-03",
              name: "Tom",
              state: "California",
              city: "Los Angeles",
              address: "No. 189, Grove St, Los Angeles",
              zip: "CA 90036",
              tag: "Home",
            },
            {
              id: 2,
              orderNo: "02",
              date: "2016-05-02",
              name: "Tom",
              state: "California",
              city: "Los Angeles",
              address: "No. 189, Grove St, Los Angeles",
              zip: "CA 90036",
              tag: "Office",
            },
            {
              id: 3,
              orderNo: "03",
              date: "2016-05-04",
              name: "Tom",
              state: "California",
              city: "Los Angeles",
              address: "No. 189, Grove St, Los Angeles",
              zip: "CA 90036",
              tag: "Home",
            },
            {
              id: 4,
              orderNo: "04",
              date: "2016-05-01",
              name: "Tom",
              state: "California",
              city: "Los Angeles",
              address: "No. 189, Grove St, Los Angeles",
              zip: "CA 90036",
              tag: "Office",
            },
            {
              id: 5,
              orderNo: "05",
              date: "2016-05-03",
              name: "Tom",
              state: "California",
              city: "Los Angeles",
              address: "No. 189, Grove St, Los Angeles",
              zip: "CA 90036",
              tag: "Home",
            },
            {
              id: 5,
              orderNo: "06",
              date: "2016-05-02",
              name: "Tom",
              state: "California",
              city: "Los Angeles",
              address: "No. 189, Grove St, Los Angeles",
              zip: "CA 90036",
              tag: "Office",
            },
            {
              id: 5,
              orderNo: "07",
              date: "2016-05-04",
              name: "Tom",
              state: "California",
              city: "Los Angeles",
              address: "No. 189, Grove St, Los Angeles",
              zip: "CA 90036",
              tag: "Home",
            },
            {
              id: 5,
              orderNo: "08",
              date: "2016-05-01",
              name: "Tom",
              state: "California",
              city: "Los Angeles",
              address: "No. 189, Grove St, Los Angeles",
              zip: "CA 90036",
              tag: "Office",
            },
          ]
    }
};
export default [{
    'get|/getOrderList': orderList
}]
