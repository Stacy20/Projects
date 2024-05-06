/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package proyectotetris;

/**
 *
 * @author mfss0
 */
public class ThreadFigures extends Thread{
    private boolean isRunning;
    private boolean isFalling;
    private boolean isPause;
    private int miliseconds;
    private FiguresList fl;
    private GameWindow wd;
    private Game game;
    private RecordScoreWindow src;
    private Music music;

    public ThreadFigures(FiguresList fl, GameWindow window, Game game, RecordScoreWindow src) {
        this.fl = fl;
        this.game = game;
        this.wd = window;
        this.src = src;
        isRunning = isFalling = true;
        music = new Music();
        
        isPause = false;
        
    }

    public boolean isIsRunning() {
        return isRunning;
    }

    public void setIsRunning(boolean isRunning) {
        this.isRunning = isRunning;
    }
    @Override
    public void run(){
        music.sound();
        while (isRunning) {
            
            while(isFalling){
                try {
                    
                    sleep(game.getMiliseconds());
                    
                    while(isPause){
                        sleep(500);
                    }

                    isFalling = fl.moveDown();
                    wd.repaint();
                    if(game.moreCountMiliseconds(game.getMiliseconds())){
                        music.stop();
                        music.sound();
                    }
                } catch (InterruptedException ex) {
                    
                }
                
            }
            int x = fl.searchFullLines();
            if( x>0){
                game.winPoints(x);
                src.addScore(new Score(game.getUserName(), game.getPts()));
            }
            
            if(game.thrFinished()){
                isRunning = isFalling = false;
                wd.dead();
            }
            else
                isFalling = true;

            wd.repaint();
            
            

        }
        music.stop();
        
        
    }
    
    public void pauseThread(){
        this.isPause = true;
    }
    
    public void resumeThread(){
        this.isPause = false;
    }
    
}
