PGDMP     -    9                {         
   ToyKingDom    15.3    15.3 C    L           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            M           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            N           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            O           1262    16398 
   ToyKingDom    DATABASE     �   CREATE DATABASE "ToyKingDom" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Vietnamese_Vietnam.1258';
    DROP DATABASE "ToyKingDom";
                postgres    false            �            1259    16449    branch    TABLE     �   CREATE TABLE public.branch (
    id integer NOT NULL,
    name character varying(20) NOT NULL,
    phone character varying(12) NOT NULL,
    address character varying(255) NOT NULL
);
    DROP TABLE public.branch;
       public         heap    postgres    false            �            1259    16448    branch_id_seq    SEQUENCE     �   CREATE SEQUENCE public.branch_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.branch_id_seq;
       public          postgres    false    220            P           0    0    branch_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.branch_id_seq OWNED BY public.branch.id;
          public          postgres    false    219            �            1259    16433    brand    TABLE     y   CREATE TABLE public.brand (
    id integer NOT NULL,
    name character varying(20) NOT NULL,
    image text NOT NULL
);
    DROP TABLE public.brand;
       public         heap    postgres    false            �            1259    16432    brand_id_seq    SEQUENCE     �   CREATE SEQUENCE public.brand_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.brand_id_seq;
       public          postgres    false    216            Q           0    0    brand_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.brand_id_seq OWNED BY public.brand.id;
          public          postgres    false    215            �            1259    16519    cart    TABLE     �   CREATE TABLE public.cart (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    pid integer NOT NULL,
    count integer NOT NULL
);
    DROP TABLE public.cart;
       public         heap    postgres    false            �            1259    16518    cart_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.cart_id_seq;
       public          postgres    false    229            R           0    0    cart_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.cart_id_seq OWNED BY public.cart.id;
          public          postgres    false    228            �            1259    16510    contacts    TABLE        CREATE TABLE public.contacts (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    subject character(255) NOT NULL,
    message text NOT NULL,
    send_date timestamp with time zone NOT NULL
);
    DROP TABLE public.contacts;
       public         heap    postgres    false            �            1259    16509    contacts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.contacts_id_seq;
       public          postgres    false    227            S           0    0    contacts_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;
          public          postgres    false    226            �            1259    16488    orderdetail    TABLE     �   CREATE TABLE public.orderdetail (
    order_id integer NOT NULL,
    pro_id integer NOT NULL,
    quantity integer NOT NULL,
    "unitPrice" double precision NOT NULL
);
    DROP TABLE public.orderdetail;
       public         heap    postgres    false            �            1259    16482    orders    TABLE     �  CREATE TABLE public.orders (
    id integer NOT NULL,
    order_date timestamp without time zone NOT NULL,
    delivery_date timestamp without time zone,
    delivery_local character varying(255) NOT NULL,
    cust_name character varying(100) NOT NULL,
    cust_phone character varying(12) NOT NULL,
    total numeric(8,0) NOT NULL,
    status boolean NOT NULL,
    username character varying(50) NOT NULL
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    16481    orders_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.orders_id_seq;
       public          postgres    false    224            T           0    0    orders_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
          public          postgres    false    223            �            1259    16458    product    TABLE     e  CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    status boolean NOT NULL,
    short_description character varying(255) NOT NULL,
    detail_description text NOT NULL,
    price double precision NOT NULL,
    for_gender character varying(10) NOT NULL,
    quantity integer NOT NULL,
    image character varying(255) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    brand_id integer NOT NULL,
    branch_id integer NOT NULL,
    supplier_id integer NOT NULL,
    old_price double precision
);
    DROP TABLE public.product;
       public         heap    postgres    false            �            1259    16457    product_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.product_id_seq;
       public          postgres    false    222            U           0    0    product_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;
          public          postgres    false    221            �            1259    16442    supplier    TABLE     �   CREATE TABLE public.supplier (
    id integer NOT NULL,
    name character varying(20) NOT NULL,
    phone character varying(12) NOT NULL,
    address character varying(255) NOT NULL,
    email character varying(255) NOT NULL
);
    DROP TABLE public.supplier;
       public         heap    postgres    false            �            1259    16441    supplier_id_seq    SEQUENCE     �   CREATE SEQUENCE public.supplier_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.supplier_id_seq;
       public          postgres    false    218            V           0    0    supplier_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.supplier_id_seq OWNED BY public.supplier.id;
          public          postgres    false    217            �            1259    16399    users    TABLE     �  CREATE TABLE public.users (
    username character varying(50) NOT NULL,
    password character varying(70),
    first_name character varying(50) NOT NULL,
    last_name character varying(20) NOT NULL,
    birthday date,
    gender boolean,
    telephone character varying(12),
    address character varying(255),
    email character varying(100) NOT NULL,
    role boolean NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �           2604    16452 	   branch id    DEFAULT     f   ALTER TABLE ONLY public.branch ALTER COLUMN id SET DEFAULT nextval('public.branch_id_seq'::regclass);
 8   ALTER TABLE public.branch ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            �           2604    16436    brand id    DEFAULT     d   ALTER TABLE ONLY public.brand ALTER COLUMN id SET DEFAULT nextval('public.brand_id_seq'::regclass);
 7   ALTER TABLE public.brand ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    16522    cart id    DEFAULT     b   ALTER TABLE ONLY public.cart ALTER COLUMN id SET DEFAULT nextval('public.cart_id_seq'::regclass);
 6   ALTER TABLE public.cart ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    228    229            �           2604    16513    contacts id    DEFAULT     j   ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);
 :   ALTER TABLE public.contacts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    227    227            �           2604    16485 	   orders id    DEFAULT     f   ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
 8   ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            �           2604    16461 
   product id    DEFAULT     h   ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);
 9   ALTER TABLE public.product ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            �           2604    16445    supplier id    DEFAULT     j   ALTER TABLE ONLY public.supplier ALTER COLUMN id SET DEFAULT nextval('public.supplier_id_seq'::regclass);
 :   ALTER TABLE public.supplier ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            @          0    16449    branch 
   TABLE DATA           :   COPY public.branch (id, name, phone, address) FROM stdin;
    public          postgres    false    220   �N       <          0    16433    brand 
   TABLE DATA           0   COPY public.brand (id, name, image) FROM stdin;
    public          postgres    false    216   �O       I          0    16519    cart 
   TABLE DATA           8   COPY public.cart (id, username, pid, count) FROM stdin;
    public          postgres    false    229   ]P       G          0    16510    contacts 
   TABLE DATA           P   COPY public.contacts (id, name, email, subject, message, send_date) FROM stdin;
    public          postgres    false    227   zP       E          0    16488    orderdetail 
   TABLE DATA           N   COPY public.orderdetail (order_id, pro_id, quantity, "unitPrice") FROM stdin;
    public          postgres    false    225   �P       D          0    16482    orders 
   TABLE DATA              COPY public.orders (id, order_date, delivery_date, delivery_local, cust_name, cust_phone, total, status, username) FROM stdin;
    public          postgres    false    224   =Q       B          0    16458    product 
   TABLE DATA           �   COPY public.product (id, name, status, short_description, detail_description, price, for_gender, quantity, image, created_at, updated_at, brand_id, branch_id, supplier_id, old_price) FROM stdin;
    public          postgres    false    222   TS       >          0    16442    supplier 
   TABLE DATA           C   COPY public.supplier (id, name, phone, address, email) FROM stdin;
    public          postgres    false    218   �X       :          0    16399    users 
   TABLE DATA           }   COPY public.users (username, password, first_name, last_name, birthday, gender, telephone, address, email, role) FROM stdin;
    public          postgres    false    214   �Y       W           0    0    branch_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.branch_id_seq', 10, true);
          public          postgres    false    219            X           0    0    brand_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.brand_id_seq', 11, true);
          public          postgres    false    215            Y           0    0    cart_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.cart_id_seq', 96, true);
          public          postgres    false    228            Z           0    0    contacts_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.contacts_id_seq', 1, false);
          public          postgres    false    226            [           0    0    orders_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.orders_id_seq', 53, true);
          public          postgres    false    223            \           0    0    product_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.product_id_seq', 4, true);
          public          postgres    false    221            ]           0    0    supplier_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.supplier_id_seq', 10, true);
          public          postgres    false    217            �           2606    16454    branch branch_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.branch
    ADD CONSTRAINT branch_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.branch DROP CONSTRAINT branch_pkey;
       public            postgres    false    220            �           2606    16440    brand brand_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.brand
    ADD CONSTRAINT brand_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.brand DROP CONSTRAINT brand_pkey;
       public            postgres    false    216            �           2606    16524    cart cart_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public            postgres    false    229            �           2606    16517    contacts contacts_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.contacts DROP CONSTRAINT contacts_pkey;
       public            postgres    false    227            �           2606    16498    orderdetail orderdetail_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.orderdetail
    ADD CONSTRAINT orderdetail_pkey PRIMARY KEY (order_id, pro_id);
 F   ALTER TABLE ONLY public.orderdetail DROP CONSTRAINT orderdetail_pkey;
       public            postgres    false    225    225            �           2606    16487    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    224            �           2606    16465    product product_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.product DROP CONSTRAINT product_pkey;
       public            postgres    false    222            �           2606    16447    supplier supplier_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.supplier
    ADD CONSTRAINT supplier_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.supplier DROP CONSTRAINT supplier_pkey;
       public            postgres    false    218            �           2606    16407    users users_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    214            �           2606    16530    cart cart_pid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pid_fkey FOREIGN KEY (pid) REFERENCES public.product(id) ON DELETE CASCADE NOT VALID;
 <   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pid_fkey;
       public          postgres    false    222    3227    229            �           2606    16525    cart cart_username_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_username_fkey FOREIGN KEY (username) REFERENCES public.users(username) ON DELETE CASCADE NOT VALID;
 A   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_username_fkey;
       public          postgres    false    214    3219    229            �           2606    16499 %   orderdetail orderdetail_order_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orderdetail
    ADD CONSTRAINT orderdetail_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE NOT VALID;
 O   ALTER TABLE ONLY public.orderdetail DROP CONSTRAINT orderdetail_order_id_fkey;
       public          postgres    false    3229    224    225            �           2606    16504 #   orderdetail orderdetail_pro_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orderdetail
    ADD CONSTRAINT orderdetail_pro_id_fkey FOREIGN KEY (pro_id) REFERENCES public.product(id) ON DELETE CASCADE NOT VALID;
 M   ALTER TABLE ONLY public.orderdetail DROP CONSTRAINT orderdetail_pro_id_fkey;
       public          postgres    false    222    225    3227            �           2606    16492    orders orders_username_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_username_fkey FOREIGN KEY (username) REFERENCES public.users(username) ON DELETE CASCADE NOT VALID;
 E   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_username_fkey;
       public          postgres    false    3219    224    214            �           2606    16471    product product_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branch(id) ON DELETE CASCADE NOT VALID;
 H   ALTER TABLE ONLY public.product DROP CONSTRAINT product_branch_id_fkey;
       public          postgres    false    222    3225    220            �           2606    16466    product product_brand_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brand(id) ON DELETE CASCADE NOT VALID;
 G   ALTER TABLE ONLY public.product DROP CONSTRAINT product_brand_id_fkey;
       public          postgres    false    3221    216    222            �           2606    16476     product product_supplier_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(id) ON DELETE CASCADE NOT VALID;
 J   ALTER TABLE ONLY public.product DROP CONSTRAINT product_supplier_id_fkey;
       public          postgres    false    218    222    3223            @   �   x�=�KN�0D��S�	P�8����ذi�fd�8Q>�ܞ��xսx.�k��n��np2�T^�U�l+����>�L"���VvD�$օή�ӯ�f�C�I�z�z�X����=;j؍�T��*�/{g虽9��=-R
Y*���ܚ��c��E���hn�J<�|��'�mRa">(P�E(y�V�,�~0㈈��U��L��^�y0{��UHer�d2/�_u�"�u8PP
�_wB�wSoI      <   f   x�-�9
�@ ���9�'2ƵԸ�Ѹ���E��<��pL~�`�c5[���ɾد6dKv�Fl��ژ��E���jS�e7m�v�u�M��k���Em      I      x������ � �      G      x������ � �      E   �   x�M�A� D�5&Q�2�?Ǡ�����U������lb�2���G�.���Fa��=��5�=��X��dn�Y�'���gmdA�#gϹ���Z��k����bm��H�/R@�x��m>0��L�gx9��u<qf�:����Zk_xDP�      D     x���9n1�k�s��x;�x��� F�4,/�	�·��"�fb`�����[9d;�;�;HP&�`���tI�9L_���x|z������üO�T�ʟ˯�vo����q�P��eMY8`��$��@j�b�CK$K�
6Q�F4���$� A�$c
*�ɗ�5�&uC~�\S����"k0ڛ�,"����͉��-e�� :�RV`��'�f�9��`8A-m�Թ!�O�Ƞ���
�m�eP$�Hl#��: �ь(�[�+���5 �Bq&Jط\#�������!�q�Ei�I�p�5�ke�Bh(�>�,K�����0�%��0O��˧����2}�9?_���I��t�6H�}5��z�G�����~��o���C��Z�-���/J�m	������ђ�!��Ό�̯@/�FhSS�ƙ�^�X�r�>��|�gMxYgI�y�YD��裷�z�d� ʊ~�饏���>*CZAq��r�]	�<������E������s�      B   5  x���Ko�8����`�cA/�Vvm�/̦�k5@@��kJTIʉ��琔i�E���D"/)��9��`��0�Nt���p�;���҆�C���}i��z�z�%c��dZ%�\���Y��1�ӜzG�	هN�wbG����I���V��&X�k��#���H�7v�]����Q(��Ɏ^��Nꚍ��t��-�<M�N��ܵ��a��4/��b^d<�o��MV$�jU���Uͳ���MY��E���U�b���q�Y�^6Nꞿ����L�^k�(��-�i"l����[r|K��~>�aT��a��ߦPJ��+4��"N ��s�b�u���#�-0�N�d/�<���Ж:��e%ۦi�=P�J���<�(�>�����Ou&�b8e���;�汾��*�{2N,b�
�}�F(���z�S�#�qB�<��Z� ��
��]��R?��ݠ�F�u6a�L9+�:�N�n�'�*�$_UP# U��e��k�Z@z/w����4N�ѽ3Z��b���L�7�4�:��r�HG���o|�k��D��9N"����t�=�2b-��V$H�`�t^eEZ>�\�튿t�d/�;��	04����L�Vla��ZS�#���q������ "g���F���D�������
�GF�qtm�i��{��l���Fi�'�up��K������I��˫�ٖ[��2�JXv�/�>[�o�8�B��b>|Obc�]�-xl�)�L1�H>�6�ޜE)�'���k�1P��<�������}�m�j�T�7č�w�N��a�P$�L珨>A� z$�Ӻ���j�	[^DY��gy���~rFKk�7]�ER�Y�X�E���FM�[��O����G��q�v���b;EM5�}��j�$`��:F�.}ןG_�>���eD{��V��l Z�'״k��������� |�Ι�
Q��/�Q�)�93+R6}�6~�����0+X�d�F���^)�쭷����S�:tyG���oF=d$B6 
�S�lGu��c��A�#���s]M�Rl�U���b�-�ճ���2OW5�,��q�Y;��;�ّ���^Z���{C�p>j�br�n�
���ָ�m�:� ��<�p����:*jL������)@��ߝ�}�_���Ѻy+ -������Ja�}����)�{�Fw�mV-����� �*��|�b%~�8�l�>`e����Xi�f:7�O�n�I��[��o�@QڣE�R�����s=���6�T��������5�#Æ�p���a�6z OwO4\Ŵ��z�L��xi��N5����(2 �/�t1�7��f�{�O      >   �   x�]��n�0���+��c�B^jժ�fc5^�A�~~-cۋ9ϵ%N�ah;�$c��4����0M/N���;n������nh����Eq�k������D�����xͰ
�y+�V�i~���\fZ1��y��3wkW%�M�n�� oT,�W����5�i�[��	R���^̸z�x��F���Ћ�;��� oS�DMq�����@^f�%�[\���������L�5��z>��(����      :   5  x���AO�0����Sp�A��@��f2ݖو���2
�֌}z���g��^��������v��h";���6�׫��BV���=�T�y��[V�S9]�O�4�"gk&߉�Iq,D-�A��q=�!�L�١6l�yê�]�HC�3qR��2�%W�N����4C�p`�C:!d��0q�37�8��Vp �ċ�`�\2�w�ޕ���7N�	.ʫ�&��>��X]p3���ެZ%���\��ә�S��(z���좨7�W؃�5N��f���qv;8��y�b�����e����0����نa|�h�      