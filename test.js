var express = require('express');
var app = express();
var cors= require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended :true}));
var products={
    "One Plus 6T":{"Category":"Mobile","Price":38000,"Discount":false,"TaxPercentage":12,"State":"Live","SKV":"OneMob3844fa","Brand":"OnePlus","metadata":{"Idea":"Abc","Processor":"SnapDragon"},"Media":"Physical","Avalaibility":"In Stock","Variation":{"color":['red','white'],"RAM":['4GB','8GB']},"parent":false,"child":false},
    "Mi A1":{"Category":"Mobile","Price":15000,"Discount":false,"TaxPercentage":12,"State":"Live","SKV":"MiMob1516fa","Brand":"Mi","metadata":{"Idea":"QWERT","Processor":"Qualcom Snapdragon"},"Media":"Digital","Avalaibility":"Out Of Stock","Variation":{"color":['black','white'],"Storage":['64GB','32GB']},"parent":false,"child":false},
    "Mi 4i":{"Category":"Mobile","Price":11999,"Discount":false,"TaxPercentage":12,"State":"Live","SKV":"MiMob1113fa","Brand":"Mi","metadata":{"Idea":"Xyz","Processor":"SnapDragon"},"Media":"Physical","Avalaibility":"In Stock","Variation":{"color":['red','silver']},"parent":false,"child":false},
    "Dove Hair Fall Rescue Shampoo":{"Category":"Shampoo","Price":105,"Discount":true,"DiscountRate":17,"TaxPercentage":5,"State":"Live","SKV":"DoSha1095tr","Brand":"Dove","metadata":{"Preservatives":"pottasium","patent":"law.inc"},"Media":"Physical","Avalaibility":"In Stock","Variation":{"size":['100ml','500ml']},"parent":true,"child":false},
    "Pantene Hair Color Control Shampoo":{"Category":"Shampoo","Price":115,"Discount":false,"State":"Live","TaxPercentage":5,"SKV":"PaSha1110fa","Brand":"Pantene","metadata":{"Longevity":"6 months","patent":"law.inc"},"Media":"Physical","Avalaibility":"In Stock","Variation":{"size":['100ml','500ml']},"parent":false,"child":false},
    "Dove Hair Fall Rescue for Men":{"Category":"Shampoo","Price":49,"Discount":true,"DiscountRate":12,"TaxPercentage":5,"State":"Draft","SKV":"PaBat4947tr","Brand":"Dove","metadata":{"Preservatives":"calcium","patent":"law.inc"},"Media":"Physical","Avalaibility":"In Stock","Variation":{"size":['100ml','500ml']},"parent":false,"child":true,"parentproduct":'Dove Hair Fall Rescue Shampoo'},
    "Rainbow Six Seige":{"Category":"Gaming","Price":1548,"Discount":true,"DiscountRate":103,"TaxPercentage":30,"State":"Live","SKV":"RaGam1516tr","Brand":"Ubisoft","metadata":{"Genre":"Advenetures","Lastupdate":"6 days ago"},"Media":"Digital","Avalaibility":"Out Of Stock","Variation":{"edition":['standard','golden']},"parent":false,"child":false},
    "Apex Legends":{"Category":"Gaming","Price":1010,"Discount":false,"TaxPercentage":30,"State":"Draft","SKV":"RaApe1012fa","Brand":"Ubisoft","metadata":{"Genre":"Action","Lastupdate":"4 days ago"},"Media":"Digital","Avalaibility":"In Stock","Variation":{"edition":['begineer','silver','platinum']},"parent":false,"child":false},
    "Dove Dry Hair Fall Rescue Shampoo":{"Category":"Shampoo","Price":52,"Discount":true,"DiscountRate":10,"TaxPercentage":5,"State":"Draft","SKV":"PaBat4917fa","Brand":"Dove","metadata":{"Preservatives":"pottasium","patent":"law.inc"},"Media":"Physical","Avalaibility":"In Stock","Variation":{"size":['100ml','500ml']},"parent":false,"child":true,"parentproduct":'Dove Hair Fall Rescue Shampoo'},
};

app.get('/products',(req,res)=>{  //  To Load the page it takes get request
    
    let cat={};
    for(var index in products) {
        cat[index]=products[index];
      }
      res.send(cat);
})


app.get('/products/category/:category',(req,res)=>{

    let cat={};
    for(var index in products)
    {
        if(products[index].Category == req.params.category)
        {
            //console.log(products[index]);
           cat[index]=products[index];
           flag=1;
        }
    }
    res.send(cat);
})

app.get('/products/brands/:brands',(req,res)=>{

    let cat={};
        for(var index in products)
        {
            if(products[index].Brand == req.params.category)
            {
                //console.log(products[index]);
               cat[index]=products[index];
            }
        }   
    res.send(cat);
})

app.get('/products/SKV',(req,res)=>{
    let cat={};

    for(var index in products)
        {
            cat[index]=products[index].SKV;
        }   
    console.log(cat);
    res.send(cat);
})


app.get('/products/findByStatus',(req,res)=>{
    let stat=req.query.status;
    let arr=[];
    for(var index in products)
        {
            if(products[index].State == stat)
            {
                arr.push(index);
            }
        }   
    res.send(arr);
})

app.get('/products/retail',(req,res)=>{
    let stat=req.query.media;
    let arr=[];

    for(var index in products)
        {
            if(products[index].Media == stat)
            {
                arr.push(index);
            }
        }   
    res.send(arr);
})

app.post('/insert',(req,res)=>{
    let name = req.query.name;
    let Category =  req.query.Category;
    let rate1=req.query.withtax;
    let rate2=req.query.withouttax;
    let Discount=req.query.Discount;
    let State=req.query.State;
    let SKV=req.query.SKV;
    let Brand=req.query.Brand;
    let Media=req.query.Media;
    let Price={rate1,rate2};
    products[name]={Category,Price,Discount,State,SKV,Brand,Media};
    var msg = "The product " + name +" was succesfully added to database.Refer /products to view all currently avalaible products. ";
    res.send(products);
})

app.delete('/product/:pid',(req,res)=>{

    var pro;
    for(var index in products)
        {
            if(products[index].SKV == req.params.pid)
            {
                delete products[index];  
                pro=index;  
            }
        }   
    var msg= "The Product " + pro +"was removed from the database. Refer /products to view all currently avalaible products.";
    res.send(msg);
})


app.put('/products/discount',(req,res)=>{
    
    let pro; let rate;
    for(var index in products)
        {
            if(products[index].SKV == req.query.SKV)
            {
                if(products[index].Discount == false)
                {
                    products[index].Discount = true ;
                   // console.log(products[index].Discount);
                    //products[index]={'Discount':true};
                }
                let nums= parseInt(req.query.Discount);
                products[index].DiscountRate=nums;
                pro=index;  rate = nums;
            }
        } 

        var msg= "The Product " + pro +"was given discount of"+ rate ;
        //console.log(products);
        res.send(msg);
})

app.get('/products/discounts',(req,res)=>{

    var jso ={};
    let id,Discountrate;
    for(var index in products)
        {
            if(products[index].Discount == true)
            {
                id=products[index].SKV;Discountrate=products[index].DiscountRate;
                jso[index]={id,Discountrate};
            }
        } 
    res.send(jso);
})

app.get('/:pid/MRP',(req,res)=>{
    var prices={};
    for(var index in products)
    {
        if(products[index].SKV == req.params.pid)
        {
        let base,tax,discount;   
        base=products[index].Price;
        tax =products[index].TaxPercentage;
        if(products[index].Discount == false)
        discount=0;
        else
        discount=products[index].DiscountRate;
        tax = base*tax/100;
        let MRP=base-tax+discount;
        prices[index]={MRP,base,tax,discount};
        }
    }
    res.send(prices);
})

app.get('/products/parentchild',(req,res)=>{
    let jso={};
    for(var index in products)
    {       
       // console.log(products[index].parent);
        if(products[index].parent == true)
        {
            //console.log(products[index]);
            let parent1=index;
            //console.log(parent1);
            let childs=[];
            for(var index2 in products)
            {
                if(products[index2].child == true )
                {
                    childs.push(index2);
                  //  console.log(products[index2]);
                }
            }
            jso[parent1]={childs};
        }
    }
    console.log(jso);
    res.send(jso);
})

app.get('/:pid/Stock',(req,res)=>{
    var string;
    for(var index in products)
    {
        if(products[index].SKV == req.params.pid)
        {
            string = products[index].Avalaibility;
        }
    }
    res.send(string);
})

app.get('/products/:pid/variations',(req,res)=>{
    var string={};
    for(var index in products)
    {
        if(products[index].SKV == req.params.pid)
        {
            string = products[index].Variation;
        }
    }
    res.send(string);
})



app.listen(3000);

