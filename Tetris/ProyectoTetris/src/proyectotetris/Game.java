/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package proyectotetris;

import java.io.Serializable;


/**
 *
 * @author mfss0
 */
public class Game implements Serializable {
    public FiguresList fl;
    private int countMiliseconds, nivel;
    private boolean gameEnd;
    private int pts, lines;
    private String userName;
    
    Game(String userName){
        fl = new FiguresList();
        gameEnd = false;
        pts = 0;
        countMiliseconds = 0;
        nivel = 20;
        this.userName = userName;
    }

    public int getMiliseconds() {
        return nivel*30;
    }

    public boolean moreCountMiliseconds(int x) {
        this.countMiliseconds += x;
        if(countMiliseconds>=120000 && nivel != 0){
            nivel--;
            countMiliseconds=0;
            return true;
        }
        return false;
        
    }
    

    public String getUserName() {
        return userName;
    }

    public int getPts() {
        return pts;
    }

    public int getLines() {
        return lines;
    }

    public boolean thrFinished(){
        
        gameEnd = fl.searchFinished();
        if (gameEnd){
            
            return true;
        }
        
        fl.addTetrominoe();
        return false;
    }

    public void winPoints(int pt){
        switch (pt) {
            case 3:
                pts += 4;
                break;
            case 4:
                pts += 5;
                break;
            default:
                pts += pt;
                break;
        }
        lines+=pt;
        
    }
    
    public void stopGame(){
        gameEnd = true;
    }

    public void saveGame(){
        FileManager flm = new FileManager();
        flm.escribirGame(userName.toUpperCase()+".bin", this);
    }
}
