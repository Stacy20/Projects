/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package proyectotetris;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Random;


/**
 *
 * @author mfss0
 */
public class FiguresList implements Serializable{
    public ArrayList<Tetrominoes>tetrosList;
    private Tetrominoes tetrosPreList[];

    FiguresList(){
        tetrosList = new ArrayList<Tetrominoes>();
        tetrosPreList = new Tetrominoes [2];
        innit();
    }

    public void innit(){
        Random re = new Random();
        for(int i = 0; i<tetrosPreList.length; i++)
            tetrosPreList[i] = new Tetrominoes(re.nextInt(7), re.nextInt(7));
        this.addTetrominoe();  
    }

    public void moveRight(){
        if(!tetrosList.isEmpty())
            tetrosList.get(tetrosList.size()-1).moveRight(tetrosList);
    }

    public void moveLeft(){
        if(!tetrosList.isEmpty())
            tetrosList.get(tetrosList.size()-1).moveLeft(tetrosList);
    }
    
    public boolean moveDown(){
        if(!tetrosList.isEmpty())
            return tetrosList.get(tetrosList.size()-1).moveDown(tetrosList);
        return false;
    }
    
    public void rotate(){
        if(!tetrosList.isEmpty())
            tetrosList.get(tetrosList.size()-1).rotate(tetrosList);
    }

    public void addTetrominoe(){
        Random re = new Random();
        tetrosList.add(tetrosPreList[0]);
        for (int i = 0; i < tetrosPreList.length-1; i++) {
            tetrosPreList[i] = tetrosPreList[i+1];
        }
        tetrosPreList[tetrosPreList.length-1] = new Tetrominoes(re.nextInt(7), re.nextInt(7));

        for (int i = 0; i < tetrosPreList.length; i++)
            tetrosPreList[i].makePreApplied(i);
        
    }

    public Tetrominoes getTetrominoe(int i){
        return tetrosList.get(i);
    }
    
    public Tetrominoes getPreTetrominoe(int i){
        return tetrosPreList[i];
    }
    
    public int getLargePreTetros(){
        return tetrosPreList.length;
    }

    public int getLargeTetros(){
        return tetrosList.size();
    }

    public int searchFullLines(){
        int count, countLines;
        countLines = 0;
        for (int i = 0; i < tetrosList.get(tetrosList.size()-1).applied.length; i++) {
            count = 0;
            if(tetrosList.get(tetrosList.size()-1).applied[i][1]>700)
                continue;   
            for (int j = 0; j < tetrosList.size(); j++) {
                for (int k = 0; k < tetrosList.get(j).applied.length; k++) {
                    if(tetrosList.get(j).applied[k][1]==
                        tetrosList.get(tetrosList.size()-1).applied[i][1])
                        count++;
                   
                    if(count == 10){
                        countLines++;
                        eraseLine(tetrosList.get(tetrosList.size()-1).applied[i][1]);
                        break;
                    }
                }
            }
        }
        eraseTetrominoe();
        return countLines;
    }

    public void eraseLine(int y){
        for (int j = 0; j < tetrosList.size(); j++) {
            
            for (int k = 0; k < tetrosList.get(j).applied.length; k++) {
                
                if(tetrosList.get(j).applied[k][1]==y){
                    tetrosList.get(j).moveBlockDown(k, 29);
                }
            }
        }

        for (int j = 0; j < tetrosList.size(); j++) {
            
            for (int k = 0; k < tetrosList.get(j).applied.length; k++) {
                if(tetrosList.get(j).applied[k][1]<y){
                    tetrosList.get(j).moveBlockDown(k, 1);
                }
            }
        }

    }

    public void eraseTetrominoe(){
        int count;
        for (int i = 0; i<tetrosList.size(); i++) {
            count = 0;
            for (int j = 0; j < tetrosList.get(i).applied.length; j++) {
                if(tetrosList.get(i).applied[j][1]>700)
                    count++;
                if(count == 4){
                    tetrosList.remove(tetrosList.get(i));
                    return;
                }
             }
         }
     }

    public boolean searchFinished(){
        for (int i = 0; i < tetrosList.get(tetrosList.size()-1).applied.length; i++) {
            if(tetrosList.get(tetrosList.size()-1).applied[i][1] <= 61){
                return true;
            }
        }
        return false;
    }

}
