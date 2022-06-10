class Lightning extends Attack{
    constructor(imageLeft, imageRight){
        super(0, 0, 160, 80, imageLeft, imageRight, 50)
    }
    static lightningFactory(left, right){
        const imageLeft = new Image()
        imageLeft.src = left
        imageLeft.alt= "image"
        const imageRight = new Image()
        imageRight.src = right
        imageRight.alt= "image"
        const lightning = new Lightning(imageLeft, imageRight);
        return lightning;
    }
}