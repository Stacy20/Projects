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
public class Score implements Serializable {
    private String name;
    private int points;
    
    public Score(){
        this.name = "";
        this.points = 0;
    }
    
    public Score(String name, int pts){
        this.name = name;
        this.points = pts;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

}
