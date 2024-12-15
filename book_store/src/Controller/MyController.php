<?php


namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MyController extends AbstractController
{
    /**
     * @Route("/hello", name="hello_world")
     */
    public function hello()
    {
        return $this->render('hello/index.html.twig');
    }
}
