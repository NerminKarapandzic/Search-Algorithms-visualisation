import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  

    _array = [];
    exectime;
    target;
    searchedItems = [];
    foundItem;
    selected;

    ngOnInit(){
        this.generateArray();
    }

    setAlgo(a){
        this.selected = a;
    }

    runAlgo(){
        switch(this.selected){
            case 'linear':
                this.linearSearch();
                break;
            case 'binary':
                this.binarySearch();
                break;
            case 'jump':
                this.jumpSearch();
                break;
        }
    }
    generateArray(){
        for(let i=0; i<1000; i++){
            this._array.push(i);
        }
    }

    checkActive(v){
        return this.searchedItems.includes(v)
    }

    setTarget(v){
        this.searchedItems = [];
        this.foundItem = undefined;
        this.target= v;
    }

    linearSearch(){
        let t1 = performance.now();
        this.searchedItems = [];
        this.foundItem=undefined;
        let l = this._array.length;
        
        let i = 0;
        let loop = () => {
            setTimeout(()=> {
                this.searchedItems.push(this._array[i]); 
                if(this.target == this._array[i]){
                    this.foundItem = this._array[i]
                    return this._array[i];
                }
                i++;
                if(i<l){
                    loop();
                }
            },20)
        }
        loop();
    }

    binarySearch(){
        let t1 = performance.now();
        this.searchedItems = [];
        this.foundItem = undefined;
        let lp = 0;
        let rp = this._array.length-1;
        this.searchedItems.push(this._array[lp])
        this.searchedItems.push(this._array[rp])

        let loop = () =>{
            setTimeout(() => {
                if(lp <= rp){
                    let mp = Math.floor((lp + rp) / 2);
                    this.searchedItems.push(this._array[mp]);
                    if(this._array[mp] == this.target){
                        return this.foundItem = this._array[mp] 
                    }
        
                    else if(mp < this.target) {
                         lp = mp + 1
                         loop();
                        }
                    else { 
                        rp = mp -1
                        loop();
                    }
                }
            }, 200);
            
        }
        loop();
        
    }

    jumpSearch(){
        let t1 = performance.now();
        this.searchedItems = [];

        let len = this._array.length;
        let step = Math.floor(Math.sqrt(len));

        let blockstart = 0, currentstep = step;
        let np = () => {
            setTimeout(() => {
                this.searchedItems.push(this._array[blockstart])
                this.searchedItems.push(this._array[currentstep])
                if(this._array[currentstep] < this.target){
                    blockstart = currentstep;
                    currentstep += step;
                    ep();
                }
            },200)
            
        }
        
        let ep = () => {
            this.searchedItems.push(this._array[blockstart])
            this.searchedItems.push(this._array[currentstep])
            
            if(currentstep >= this.target){
                let i = blockstart;
                let loop = () => {
                    setTimeout(() => {
                        this.searchedItems.push(this._array[i])

                        if(this._array[i] == this.target){
                            return this.foundItem = this._array[i]
                        }else{
                            i++;
                            loop()
                        }
                    },200)
                }
                loop();
            }else{
                np()
            }
        }
        ep();
    }
}
