/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package proyectotetris;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.UnsupportedAudioFileException;
/**
 *
 * @author mfss0
 */
public class Music {
    private Clip clip;
    
    public void sound(){
        try{ 
            clip= AudioSystem.getClip();
            clip.open(AudioSystem.getAudioInputStream(getClass().getResourceAsStream("/proyectotetris/img/animals.wav")));
            clip.start();
        }catch(LineUnavailableException | UnsupportedAudioFileException | IOException ex){
             Logger.getLogger(Music.class.getName()).log(Level.SEVERE, null, ex);
        }
         
    }
    
    public void stop(){
        clip.stop();
    }
}
