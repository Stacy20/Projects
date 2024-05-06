/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package proyectotetris;

import java.io.Serializable;
import java.util.ArrayList;

import javax.swing.ImageIcon;
/**
 *
 * @author mfss0
 */
public class Tetrominoes implements Serializable{
    public int[][] original, applied, preApplied;
    private int type, color, movex;
    private int[] movey;
    private javax.swing.ImageIcon img, preImg;

    public Tetrominoes(int type, int color) {
        movex=0;
        this.type = type;
        original = new int[4][2];
        applied = new int[4][2];
        preApplied = new int[4][2];
        movey = new int[4];
        makeOriginals();
        makeApplieds();
        setImgPreview(color);
        setImg(color);
        
    }
    
    public void makeOriginals(){
        switch(this.type){
            case 0: original = new int[][] {{0,0},{0,1},{0,-1},{1,-1}};break; //L vuelta
            case 1: original = new int[][] {{0,0},{0,1},{0,-1},{-1,-1}};break; //L 
            case 2: original = new int[][] {{0,0},{0,-1},{1,0},{-1,0}}; break; //T
            case 3: original = new int[][] {{0,0},{-1,0},{1,0},{-2, 0}}; break; //| 1
            case 4: original = new int[][] {{0,0}, {1,1}, {0,1}, {1,0}}; break; //[]
            case 5: original = new int[][] {{0, 0}, {0,1}, {-1,0}, {1,1}}; break; //z vuelta 1
            default: original = new int[][] {{0, 0}, {-1,0}, {0, 1}, {-1, -1}}; break;  //z 1
            
        }
    }

    public void makeApplieds(){
        for (int i = 0; i < original.length; i++){
            applied[i][0]=(original[i][0])*29+174+movex;
            applied[i][1]=(original[i][1])*29+58+movey[i];
        }
            
        
         
    }

    public void makePreApplied(int y){
        for (int i = 0; i < original.length; i++){
            preApplied[i][0]=(original[i][0])*20+405;
            preApplied[i][1]=(original[i][1])*20+100+y*70;
        }
    }

    public void setImgPreview(int imgId) {
        String imagePath;
        switch (imgId){
            case 0:
                imagePath = "/proyectotetris/img/figPreNaranja.jpg";
                break;
            case 1:
                imagePath = "/proyectotetris/img/figPreRoja.jpg";
                break;
            case 2:
                imagePath = "/proyectotetris/img/figPreVerde.jpg";
                break;
            case 3:
                imagePath = "/proyectotetris/img/figPreCeleste.jpg";
                break;
            case 4:
                imagePath = "/proyectotetris/img/figPreMorada.jpg";
                break;
            case 5:
                imagePath = "/proyectotetris/img/figPreUltraNegra.jpg";
                break;
            default:
                imagePath = "/proyectotetris/img/figPreAzul.jpg";
                break;
        }
        preImg = new javax.swing.ImageIcon(getClass().getResource(imagePath));
    }

    public void setImg(int imgId) {
        String imagePath;
        switch (imgId){
            case 0:
                imagePath = "/proyectotetris/img/figNaranja.jpg";
                break;
            case 1:
                imagePath = "/proyectotetris/img/figRoja.jpg";
                break;
            case 2:
                imagePath = "/proyectotetris/img/figVerde.jpg";
                break;
            case 3:
                imagePath = "/proyectotetris/img/figCeleste.jpg";
                break;
            case 4:
                imagePath = "/proyectotetris/img/figMorada.jpg";
                break;
            case 5:
                imagePath = "/proyectotetris/img/figUltraNegra.jpg";
                break;
            default:
                imagePath = "/proyectotetris/img/figAzul.jpg";
                break;
        }
        img = new javax.swing.ImageIcon(getClass().getResource(imagePath));
    }
    
    public ImageIcon getPreImg() {
        return preImg;
    }

    public ImageIcon getImg() {
        return img;
    }
    
    public void rotate(ArrayList<Tetrominoes> array){
        switch(this.type){
            case 0: rotate4(array); break;
            case 1: rotate4(array); break;
            case 2: rotate4(array);break;
            case 3: rotate2(array);break;
            case 4: return;
            case 5: rotate2(array);break;
            default: rotate2(array);
        }
    }

    private void rotate2(ArrayList<Tetrominoes> array){
        int[][] newOriginal;
        int[][] newApplied = new int[4][2];
        switch(this.type){
            case 3:
                if(original[1][1]==0)
                    newOriginal = new int[][] {{0,0},{0,1},{0,-1},{0,2}};
                else
                    newOriginal = new int[][] {{0,0},{-1,0},{1,0},{-2, 0}};
                break;
            case 5:
                if(original[1][1]==1)
                    newOriginal = new int[][] {{0, 0}, {-1, 0}, {0,-1}, {-1,1}};
                else
                    newOriginal = new int[][] {{0, 0}, {0,1}, {-1,0}, {1,1}};
                break;
            default:
                if(original[1][1]==1)
                    newOriginal = new int[][] {{0, 0}, {-1,0}, {0, 1}, {-1, -1}};
                else
                    newOriginal = new int[][] {{0, 0}, {0,1}, {1,0}, {-1, 1}};

        }

        for (int i = 0; i < original.length; i++){
            newApplied[i][0]=(newOriginal[i][0])*29+174+movex;
            newApplied[i][1]=(newOriginal[i][1])*29+58+movey[i];

            if(newApplied[i][0]>290 || newApplied[i][0]<28 || newApplied[i][1]>616) return;
        
            for (int j = 0; j < array.size()-1; j++) {
                for (int k = 0; k < applied.length; k++) {
                    if(array.get(j).applied[k][1]==newApplied[i][1]&&
                    array.get(j).applied[k][0]==newApplied[i][0])
                        return;
                }
            }  
        }
        original = newOriginal;
        
        makeApplieds();
        return;
    }

    private void rotate4(ArrayList<Tetrominoes> array){
        int[][] newApplied = new int[4][2];

        for (int i = 0; i < original.length; i++){
            newApplied[i][0]=(-original[i][1])*29+174+movex;
            newApplied[i][1]=(original[i][0])*29+58+movey[i];

            if(newApplied[i][0]>290 || newApplied[i][0]<28 || newApplied[i][1]>616) return;
        
            for (int j = 0; j < array.size()-1; j++) {
                for (int k = 0; k < applied.length; k++) {
                    if(array.get(j).applied[k][1]==newApplied[i][1]&&
                    array.get(j).applied[k][0]==newApplied[i][0])
                        return;

                }
            }  
        }

        int x;
        int y;
        for (int i = 0; i < 4; ++i) {
            x = original[i][0];
            y = original[i][1];
            original[i][0]= -y;
            original[i][1]= x;;
        }
        makeApplieds();
    }

    public void moveRight(ArrayList<Tetrominoes> array){
        for (int i = 0; i < applied.length; i++) {
            if(applied[i][0]>286)
                return;
            for (int j = 0; j < array.size()-1; j++) {
                for (int k = 0; k < applied.length; k++) {
                    if(array.get(j).applied[k][1]==applied[i][1]&&
                    array.get(j).applied[k][0]==applied[i][0]+29)
                  
                        return;
                }

                
            }         
        }
        movex+=29;
        makeApplieds();
    }
    
    public void moveLeft(ArrayList<Tetrominoes> array){
        for (int i = 0; i < applied.length; i++) {
            if(applied[i][0]<42)
                return;
        
            for (int j = 0; j < array.size()-1; j++) {
                for (int k = 0; k < applied.length; k++) {
                    if(array.get(j).applied[k][1]==applied[i][1]&&
                    array.get(j).applied[k][0]==applied[i][0]-29) 
                        return;
                }
                
            }
                        
        }

        movex-=29;
        makeApplieds();
    }
    
    public boolean moveDown(ArrayList<Tetrominoes> array){
        for (int i = 0; i < applied.length; i++) {
            if(applied[i][1]>616)
                return false;
            for (int j = 0; j < array.size()-1; j++) {
                for (int k = 0; k < applied.length; k++) {
                    if(array.get(j).applied[k][0]==applied[i][0]&&
                    array.get(j).applied[k][1]==applied[i][1]+29)
                        return false;
                }
                
            }
                        
        }
        for (int i = 0; i < movey.length; i++) {
            movey[i]+=29;
        }
        makeApplieds();
        return true;
    }
    
    public void moveBlockDown(int index, int blocks){
        movey[index]+=29*blocks;
        makeApplieds();
    }
}
