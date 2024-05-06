/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package proyectotetris;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.event.KeyEvent;
import javax.swing.ImageIcon;


/**
 *
 * @author mfss0
 */
public class GameWindow extends javax.swing.JFrame  {
    private boolean spaceBar, end;
    private Game game;
    private ThreadFigures thr;

    /**
     * Creates new form Menu
     */
    public GameWindow(Game game, RecordScoreWindow src) {
        initComponents();
        this.game = game;
        thr = new ThreadFigures(game.fl, this, game, src);
        this.spaceBar = this.end = false;
        thr.start();
        
        
    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);
        setTitle("Tetris");
        setBackground(new java.awt.Color(204, 204, 204));
        setResizable(false);
        addWindowListener(new java.awt.event.WindowAdapter() {
            public void windowClosed(java.awt.event.WindowEvent evt) {
                formWindowClosed(evt);
            }
        });
        addKeyListener(new java.awt.event.KeyAdapter() {
            public void keyPressed(java.awt.event.KeyEvent evt) {
                formKeyPressed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 470, Short.MAX_VALUE)
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 643, Short.MAX_VALUE)
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void formKeyPressed(java.awt.event.KeyEvent evt) {//GEN-FIRST:event_formKeyPressed
        tetrominoeMove(evt.getKeyCode());
    }//GEN-LAST:event_formKeyPressed

    private void formWindowClosed(java.awt.event.WindowEvent evt) {//GEN-FIRST:event_formWindowClosed
        game.stopGame();
        
    }//GEN-LAST:event_formWindowClosed

    /**
     * @param args the command line arguments
     */
    @Override
    public void paint(Graphics g){
        g.drawImage((new javax.swing.ImageIcon(getClass().getResource("/proyectotetris/img/fondoRestante.jpg"))).getImage(), 339, 28, this);
        
        g.drawImage((new javax.swing.ImageIcon(getClass().getResource("/proyectotetris/img/background.jpg"))).getImage(), 28, 73, this);
        
        
        for(int i = 0; i<game.fl.getLargeTetros(); i++){
            for(int j=0; j<game.fl.getTetrominoe(i).applied.length; j++){
                g.drawImage(game.fl.getTetrominoe(i).getImg().getImage(), game.fl.getTetrominoe(i).applied[j][0], game.fl.getTetrominoe(i).applied[j][1], this);
            }
        }
        
        for(int i = 0; i<game.fl.getLargePreTetros(); i++){
            for(int j=0; j<game.fl.getPreTetrominoe(i).preApplied.length; j++){
                g.drawImage(game.fl.getPreTetrominoe(i).getPreImg().getImage(), game.fl.getPreTetrominoe(i).preApplied[j][0], game.fl.getPreTetrominoe(i).preApplied[j][1], this);
            }
        }
        
        ImageIcon grayBlock =new javax.swing.ImageIcon(getClass().getResource("/proyectotetris/img/figGris.jpg"));
        for(int i = 0; i<22; i++){
            g.drawImage(grayBlock.getImage(), 0, 32+29*i, this);
            g.drawImage(grayBlock.getImage(), 319, 32+29*i, this);
        }
        
        for(int i = 1; i<11; i++){
            g.drawImage(grayBlock.getImage(), 29*i, 32, this);
            g.drawImage(grayBlock.getImage(), 29*i, 61, this);
        }
        
         g.setFont(new Font("OCRAExtended", Font.BOLD, 20));
         g.setColor(Color.white);
         
         g.drawString( Integer.toString(game.getPts()), 400, 440);
         g.drawString(Integer.toString(game.getLines()), 400, 600);
        
        g.drawImage(new javax.swing.ImageIcon(getClass().getResource("/proyectotetris/img/letterP.png")).getImage(), 350, 320, this);
        g.drawImage(new javax.swing.ImageIcon(getClass().getResource("/proyectotetris/img/letterT.png")).getImage(), 390, 320, this);
        g.drawImage(new javax.swing.ImageIcon(getClass().getResource("/proyectotetris/img/letterS.png")).getImage(), 430, 320, this);
        g.drawImage(new javax.swing.ImageIcon(getClass().getResource("/proyectotetris/img/letterL.png")).getImage(), 360, 480, this);
        g.drawImage(new javax.swing.ImageIcon(getClass().getResource("/proyectotetris/img/letterN.png")).getImage(), 400, 480, this);
        if(end)
            g.drawImage(new javax.swing.ImageIcon(getClass().getResource("/proyectotetris/img/gameOver.png")).getImage(), 20, 40, this);
    
    
    }   

    public void tetrominoeMove(int x){
        switch(x){
            case KeyEvent.VK_DOWN:
                game.fl.moveDown();
                repaint();
                break;
            case KeyEvent.VK_RIGHT:
                game.fl.moveRight();
                repaint();
                break;
            case KeyEvent.VK_LEFT:
                game.fl.moveLeft();
                repaint();
                break;
            case KeyEvent.VK_UP:
                game.fl.rotate();
                repaint();
                break;
            case KeyEvent.VK_S:
                game.saveGame();
                break;
            case KeyEvent.VK_SPACE:
                if(spaceBar){
                    thr.resumeThread();
                    spaceBar = false;
                }
                else{
                    thr.pauseThread();
                    spaceBar = true;
                }
                break;
            default:
                break;       
        }
    }
    
    public void dead(){
        end = true;
    }
    
}   


    
    
    // Variables declaration - do not modify//GEN-BEGIN:variables
    // End of variables declaration//GEN-END:variables

        
    
