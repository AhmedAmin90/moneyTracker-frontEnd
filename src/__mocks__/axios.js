
const mockResponse = {
    // data: {
    //     user: {id: 1, email: "", created_at: "2021-08-19T12:25:14.513Z", updated_at: "2021-08-19T12:25:14.513Z", username: "ahmed"},
    //     items: [{
    //         created_at: "2021-08-19T12:25:38.451Z",
    //         icon: "fas fa-coffee",
    //         id: 1,
    //         name: "cafe",
    //         updated_at: "2021-08-19T12:25:38.451Z",
    //         user_id: 1
    //     }]
    // }

   date: {
    user: {id: 3, email: "nada@email.com", created_at: "2021-08-13T19:52:11.203Z", updated_at: "2021-08-13T19:52:11.203Z", username: "nada"}, 
    items: {id: 4, name: "test", user_id: 3, created_at: "2021-08-14T11:37:42.882Z", updated_at: "2021-08-14T11:37:42.882Z"}, 
    total: 353
   } 
}


export  const getData = ()=> {
    jest.fn().mockResolvedValue(mockResponse)

}
