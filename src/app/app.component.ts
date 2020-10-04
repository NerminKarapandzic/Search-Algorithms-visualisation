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

    ngOnInit(){
        this.generateArray();
    }

    generateArray(){
        for(let i=0; i<2000; i++){
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
                         this.searchedItems.push(this._array[lp])
                         loop();
                        }
                    else { 
                        rp = mp -1
                        this.searchedItems.push(this._array[lp]) 
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
        while(this._array[Math.min(step, len)- 1] < this.target){
            blockstart = currentstep;
            currentstep += step;
            
            if(blockstart >= len){
                return -1;
            }
        }

        
        while(this._array[blockstart] < this.target){
            blockstart ++;
            
            if(blockstart == Math.min(currentstep, len)){
                return -1;
            }
        }

        if(this._array[blockstart] == this.target){
            return this.foundItem = this._array[blockstart];
        }else{
            return -1
        }

    }
}
