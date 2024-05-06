/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package proyectotetris;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

/**
 *
 * @author mfss0
 */
public class FileManager {

    public void escribirGame(String name, Game game)
    {
        try {
            File file = new File(name);
            ObjectOutputStream fille = new ObjectOutputStream(new FileOutputStream(file));
            
            fille.writeObject(game);
            fille.close();
        } catch (IOException ex) {
            
        }
    }
    
    public Game leerGame(String path){
        try {
            ObjectInputStream file = new ObjectInputStream(new FileInputStream( path ));
            Game game = (Game) file.readObject();
            file.close();
            return game;
        } catch (ClassNotFoundException | IOException ex) {
             return null;
        }
    }

    public void escribirRecordScore(String name, Score [] rs)
    {
        try {
            File file = new File(name);
            ObjectOutputStream fille = new ObjectOutputStream(new FileOutputStream(file));
            
            fille.writeObject(rs);
            fille.close();
        } catch (IOException ex) {
           
        }
    }
    
    public Score [] leerRecordScore(String path){
        try {
            ObjectInputStream file = new ObjectInputStream(new FileInputStream( path ));
            Score [] rs = (Score []) file.readObject();
            file.close();
            return rs;
        } catch (ClassNotFoundException | IOException ex) {
             return null;
        }
    }

}


