<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <style>
        .product-card {
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }
        .product-img {
            height: 150px;
            width: 100%;
            object-fit: contain;
        }
        .product-title {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .product-price {
            color: #ff5722;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .product-price span {
            color: #999;
            font-size: 14px;
            text-decoration: line-through;
        }
        .product-rating {
            color: #ffc107;
            font-size: 16px;
        }
        .product-status {
            color: #4CAF50;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <div class="product-card">
                    <img src="https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/n/q/x/s-vnk3006655-vishudh-original-imagxwwwqx63mqaq.jpeg?q=70" class="product-img" alt="Premium Kashmiri Dried Mushrooms">
                    <div class="product-title">premium-kashmiri-dried mushroo...</div>
                    <div class="product-price">Rs 150 <span>Rs 125</span></div>
                    <div class="product-rating">★★★★★</div>
                    <div class="product-status">In Stock</div>
                    <div class="product-discount">10%</div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="product-card">
                    <img src="https://i.imgur.com/B8jW8wL.jpg" class="product-img" alt="Fresh White Mushrooms">
                    <div class="product-title">Fresh mushrooms...</div>
                    <div class="product-price">Rs 70 <span>Rs 60</span></div>
                    <div class="product-rating">★★★★★</div>
                    <div class="product-status">In Stock</div>
                    <div class="product-discount">5%</div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="product-card">
                    <img src="https://i.imgur.com/3Z3a91p.jpg" class="product-img" alt="Mushroom Powder">
                    <div class="product-title">Mushroom powder...</div>
                    <div class="product-price">Rs 195 <span>Rs 150</span></div>
                    <div class="product-rating">★★★★☆</div>
                    <div class="product-status">In Stock</div>
                    <div class="product-discount">10%</div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="product-card">
                    <img src="https://i.imgur.com/p34qC2s.jpg" class="product-img" alt="Spicy Mushroom Pickle">
                    <div class="product-title">Spicy mushroom pickle...</div>
                    <div class="product-price">Rs 85 <span>Rs 76</span></div>
                    <div class="product-rating">★★★★★</div>
                    <div class="product-status">In Stock</div>
                    <div class="product-discount">5%</div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
</body>
</html> 