var express = require('express');
var app = express();
var cors= require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended :true}));
var items=[]; //the cart
var products={
    "One Plus 6T":{"Category":"Mobile","Price":38000,"Discount":false,"TaxPercentage":12,"State":"Live","SKU":"OneMob3844fa","Brand":"OnePlus","metadata":{"Idea":"Abc","Processor":"SnapDragon"},"Media":"Physical","Avalaibility":"In Stock","Variation":{"color":['red','white'],"RAM":['4GB','8GB']},"parent":false,"child":false},
    "Mi A1":{"Category":"Mobile","Price":15000,"Discount":false,"TaxPercentage":12,"State":"Live","SKU":"MiMob1516fa","Brand":"Mi","metadata":{"Idea":"QWERT","Processor":"Qualcom Snapdragon"},"Media":"Digital","Avalaibility":"Out Of Stock","Variation":{"color":['black','white'],"Storage":['64GB','32GB']},"parent":false,"child":false},
    "Mi 4i":{"Category":"Mobile","Price":11999,"Discount":false,"TaxPercentage":12,"State":"Live","SKU":"MiMob1113fa","Brand":"Mi","metadata":{"Idea":"Xyz","Processor":"SnapDragon"},"Media":"Physical","Avalaibility":"In Stock","Variation":{"color":['red','silver']},"parent":false,"child":false},
    "Dove Hair Fall Rescue Shampoo":{"Category":"Shampoo","Price":105,"Discount":true,"DiscountRate":17,"TaxPercentage":5,"State":"Live","SKU":"DoSha1095tr","Brand":"Dove","metadata":{"Preservatives":"pottasium","patent":"law.inc"},"Media":"Physical","Avalaibility":"In Stock","Variation":{"size":['100ml','500ml']},"parent":true,"child":false},
    "Pantene Hair Color Control Shampoo":{"Category":"Shampoo","Price":115,"Discount":false,"State":"Live","TaxPercentage":5,"SKU":"PaSha1110fa","Brand":"Pantene","metadata":{"Longevity":"6 months","patent":"law.inc"},"Media":"Physical","Avalaibility":"In Stock","Variation":{"size":['100ml','500ml']},"parent":false,"child":false},
    "Dove Hair Fall Rescue for Men":{"Category":"Shampoo","Price":49,"Discount":true,"DiscountRate":12,"TaxPercentage":5,"State":"Draft","SKU":"PaBat4947tr","Brand":"Dove","metadata":{"Preservatives":"calcium","patent":"law.inc"},"Media":"Physical","Avalaibility":"In Stock","Variation":{"size":['100ml','500ml']},"parent":false,"child":true,"parentproduct":'Dove Hair Fall Rescue Shampoo'},
    "Rainbow Six Seige":{"Category":"Gaming","Price":1548,"Discount":true,"DiscountRate":103,"TaxPercentage":30,"State":"Live","SKU":"RaGam1516tr","Brand":"Ubisoft","metadata":{"Genre":"Advenetures","Lastupdate":"6 days ago"},"Media":"Digital","Avalaibility":"Out Of Stock","Variation":{"edition":['standard','golden']},"parent":false,"child":false},
    "Apex Legends":{"Category":"Gaming","Price":1010,"Discount":false,"TaxPercentage":30,"State":"Draft","SKU":"RaApe1012fa","Brand":"Ubisoft","metadata":{"Genre":"Action","Lastupdate":"4 days ago"},"Media":"Digital","Avalaibility":"In Stock","Variation":{"edition":['begineer','silver','platinum']},"parent":false,"child":false},
    "Dove Dry Hair Fall Rescue Shampoo":{"Category":"Shampoo","Price":52,"Discount":true,"DiscountRate":10,"TaxPercentage":5,"State":"Draft","SKU":"PaBat4917fa","Brand":"Dove","metadata":{"Preservatives":"pottasium","patent":"law.inc"},"Media":"Physical","Avalaibility":"In Stock","Variation":{"size":['100ml','500ml']},"parent":false,"child":true,"parentproduct":'Dove Hair Fall Rescue Shampoo'},
};
app.get('/products',(req,res)=>{  //  To Load the page it takes get request
    
    let cat={};
    for(var index in products) {
        cat[index]=products[index];
      }
      res.json(cat);
})


app.get('/products/category/:cname',(req,res)=>{

    let cat=[];
    for(var index in products)
    {
        if(products[index].Category == req.params.cname)
        {
            //console.log(products[index]);
           cat.push(index);
           flag=1;
        }
    }
    res.json(cat);
})

app.get('/products/category',(req,res)=>{

    let cat=[];
    for(var index in products)
    {
        if(cat.indexOf(products[index].Category)==-1)
        cat.push(products[index].Category); 
    }
    res.json(cat);
})

app.get('/products/brand/:bran',(req,res)=>{

    let cat=[];
        for(var index in products)
        {
            if(products[index].Brand == req.params.bran)
            {
                //console.log(products[index]);
               cat.push(index);
            }
        }   
    res.json(cat);
})
app.get('/products/brand',(req,res)=>{

    let cat=[];
        for(var index in products)
        {
            if(cat.indexOf(products[index].Brand)==-1)
            cat.push(products[index].Brand);
        }   
    res.json(cat);
})


app.get('/products/:SKU',(req,res)=>{
    let cat={};

    for(var index in products)
        {
            if(products[index].SKU == req.params.SKU)
            cat[index]=products[index];
        }   
    //console.log(cat);
    res.json(cat);
})


app.get('/products/Status/Live',(req,res)=>{
    var arr=[];
    for(var index in products)
        {
            if(products[index].State == "Live")
            {
                arr.push(index);
            }
        }   
    res.json(arr);
})

app.get('/products/Status/Draft',(req,res)=>{
    var arr=[];
    for(var index in products)
        {
            if(products[index].State == "Draft")
            {
                arr.push(index);
            }
        }   
    res.json(arr);
})

app.get('/products/retail',(req,res)=>{
    let stat=req.query.status;
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

app.post('/product/insert',(req,res)=>{
    let name = req.query.name;
    let Category =  req.query.Category;
    let rate1=req.query.withtax;
    let rate2=req.query.withouttax;
    let Discount=req.query.Discount;
    let State=req.query.State;
    let SKU=req.query.SKU;
    let Brand=req.query.Brand;
    let Media=req.query.Media;
    let Price={rate1,rate2};
    products[name]={Category,Price,Discount,State,SKU,Brand,Media};
    var msg = "The product " + name +" was succesfully added to database.Refer /products to view all currently avalaible products. ";
    res.json(products);
})

app.delete('/product/:pid',(req,res)=>{

    var pro;
    for(var index in products)
        {
            if(products[index].SKU == req.query.pid)
            {
                delete products[index];  
                pro=index;  
            }
        }   
    var msg= "The Product " + pro +"was removed from the database. Refer /products to view all currently avalaible products.";
    res.json(msg);
})


app.put('/products/discount',(req,res)=>{
    
    let pro; let rate;
    for(var index in products)
        {
            if(products[index].SKU == req.query.SKU)
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

        var msg= "The Product " + pro +" was given discount of"+ rate ;
        //console.log(products);
        res.json(msg);
})

app.get('/products/discounts',(req,res)=>{

    var jso ={};
    let id,Discountrate;
    for(var index in products)
        {
            if(products[index].Discount == true)
            {
                id=products[index].SKU;Discountrate=products[index].DiscountRate;
                jso[index]={id,Discountrate};
            }
        } 
    res.json(jso);
})

app.get('/products/:pid/MRP',(req,res)=>{
    var prices={};
    for(var index in products)
    {
        //console.log(req.params.pid);
        if(products[index].SKU == req.params.pid)
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
    res.json(prices);
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

app.get('/products/:pid/Stock',(req,res)=>{
    var string;
    console.log("olall");
    console.log(req.params.pid);
    for(var index in products)
    {
        if(products[index].SKU == req.params.pid)
        {
            
            string = products[index].Avalaibility;
        }
    }
    res.send(string);
})

app.get('/products/:pid/variations',(req,res)=>{
    for(var index in products)
    {
        if(products[index].SKU == req.params.pid)
        {
            res.send(products[index].Variation);
        }
    }
})

app.get('/cart',(req,res)=>{
    items.push(req.query.status);
    res.json(items);
})

app.get('/order',(req,res)=>{
    let total,MRP;
    for(let i=0;i<items.length;i++)
    {
        total=0;
        for(var index in products)
    {
        if(items[i] == index)
        {
        let base,tax,discount;   
        base=products[index].Price;
        tax =products[index].TaxPercentage;
        if(products[index].Discount == false)
        discount=0;
        else
        discount=products[index].DiscountRate;
        tax = base*tax/100;
        MRP=base-tax+discount;
    }
    total=total+MRP;
    }
    }
    var  str="Your Order Totals to "+total;
    items =[]; //emptying the cart
    res.json(str);
})


app.listen(3000);

